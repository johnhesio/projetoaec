-- Sanare — schema inicial
-- Rode este arquivo inteiro no SQL Editor do seu projeto Supabase
-- (Dashboard → SQL Editor → New query → colar e Run).

-- ============================================================
-- Tabelas
-- ============================================================

create table if not exists public.pacientes (
  id uuid primary key references auth.users (id) on delete cascade,
  tipo text not null check (tipo in ('pf', 'pj')),
  nome text not null, -- nome completo (pf) ou razão social (pj)
  documento text not null, -- CPF (pf) ou CNPJ (pj)
  telefone text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.profissionais (
  id uuid primary key references auth.users (id) on delete cascade,
  nome text not null,
  email text not null,
  foto_url text,
  especialidade text not null,
  conselho_tipo text not null check (conselho_tipo in ('CRM', 'CRO', 'CRP', 'COREN', 'CREFITO')),
  conselho_numero text not null,
  servicos text[] not null default '{}',
  verificado boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.consentimentos_lgpd (
  id uuid primary key default gen_random_uuid(),
  paciente_id uuid not null references public.pacientes (id) on delete cascade,
  profissional_id uuid references public.profissionais (id) on delete set null,
  assinatura_tipo text not null check (assinatura_tipo in ('digital', 'impresso')),
  versao_termo text not null default 'v1',
  assinado_em timestamptz not null default now()
);

create table if not exists public.fichas_clinicas (
  id uuid primary key default gen_random_uuid(),
  paciente_id uuid not null references public.pacientes (id) on delete cascade,
  profissional_id uuid not null references public.profissionais (id) on delete cascade,
  conteudo jsonb not null default '{}',
  resposta jsonb,
  status text not null default 'enviada' check (status in ('enviada', 'respondida')),
  created_at timestamptz not null default now(),
  respondida_em timestamptz
);

create table if not exists public.horarios_agenda (
  id uuid primary key default gen_random_uuid(),
  profissional_id uuid not null references public.profissionais (id) on delete cascade,
  paciente_id uuid references public.pacientes (id) on delete set null,
  inicio timestamptz not null,
  fim timestamptz not null,
  status text not null default 'disponivel' check (status in ('disponivel', 'reservado', 'confirmado', 'cancelado')),
  created_at timestamptz not null default now()
);

-- ============================================================
-- Criação automática de perfil ao cadastrar (auth.users -> pacientes/profissionais)
-- Os dados extras vêm de options.data no supabase.auth.signUp() do frontend.
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if new.raw_user_meta_data ->> 'role' = 'paciente' then
    insert into public.pacientes (id, tipo, nome, documento, telefone)
    values (
      new.id,
      new.raw_user_meta_data ->> 'tipo',
      new.raw_user_meta_data ->> 'nome',
      new.raw_user_meta_data ->> 'documento',
      new.raw_user_meta_data ->> 'telefone'
    );
  elsif new.raw_user_meta_data ->> 'role' = 'profissional' then
    insert into public.profissionais (id, nome, email, especialidade, conselho_tipo, conselho_numero, servicos)
    values (
      new.id,
      new.raw_user_meta_data ->> 'nome',
      new.email,
      new.raw_user_meta_data ->> 'especialidade',
      new.raw_user_meta_data ->> 'conselho_tipo',
      new.raw_user_meta_data ->> 'conselho_numero',
      coalesce(
        (select array_agg(x) from jsonb_array_elements_text(new.raw_user_meta_data -> 'servicos') as x),
        '{}'
      )
    );
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Triggers run with the function owner's privileges regardless of grants,
-- so this only blocks calling it directly as a public API endpoint
-- (PostgREST exposes every function in `public` as /rpc/<nome>).
revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- ============================================================
-- Row Level Security
-- ============================================================

alter table public.pacientes enable row level security;
alter table public.profissionais enable row level security;
alter table public.consentimentos_lgpd enable row level security;
alter table public.fichas_clinicas enable row level security;
alter table public.horarios_agenda enable row level security;

-- pacientes: dado sensível, só o próprio paciente enxerga
create policy "Paciente vê o próprio cadastro" on public.pacientes
  for select using (auth.uid() = id);
create policy "Paciente atualiza o próprio cadastro" on public.pacientes
  for update using (auth.uid() = id);

-- profissionais: perfil é público (usado na busca por especialidade)
create policy "Qualquer um vê perfis de profissionais" on public.profissionais
  for select using (true);
create policy "Profissional atualiza o próprio cadastro" on public.profissionais
  for update using (auth.uid() = id);

-- consentimentos_lgpd: paciente e o profissional envolvido podem ver
create policy "Paciente vê seus consentimentos" on public.consentimentos_lgpd
  for select using (auth.uid() = paciente_id);
create policy "Profissional vê consentimentos com ele" on public.consentimentos_lgpd
  for select using (auth.uid() = profissional_id);
create policy "Paciente registra seu consentimento" on public.consentimentos_lgpd
  for insert with check (auth.uid() = paciente_id);

-- fichas_clinicas: só paciente e profissional do atendimento
create policy "Envolvidos veem a ficha" on public.fichas_clinicas
  for select using (auth.uid() = paciente_id or auth.uid() = profissional_id);
create policy "Paciente cria a ficha" on public.fichas_clinicas
  for insert with check (auth.uid() = paciente_id);
create policy "Profissional responde a ficha" on public.fichas_clinicas
  for update using (auth.uid() = profissional_id);

-- horarios_agenda: disponibilidade é pública, reserva é dos envolvidos
create policy "Qualquer um vê a agenda" on public.horarios_agenda
  for select using (true);
create policy "Profissional gerencia sua agenda" on public.horarios_agenda
  for all using (auth.uid() = profissional_id);

-- ============================================================
-- Storage: fotos de perfil dos profissionais
-- ============================================================

insert into storage.buckets (id, name, public)
values ('avatares', 'avatares', true)
on conflict (id) do nothing;

-- Sem política de SELECT: o bucket já é público, então getPublicUrl() serve
-- os objetos direto por URL sem passar pela RLS. Uma política de SELECT aqui
-- só habilitaria listar/enumerar todos os arquivos via API, sem necessidade.
create policy "Usuário envia seu próprio avatar" on storage.objects
  for insert with check (
    bucket_id = 'avatares' and auth.uid()::text = (storage.foldername(name))[1]
  );
create policy "Usuário atualiza seu próprio avatar" on storage.objects
  for update using (
    bucket_id = 'avatares' and auth.uid()::text = (storage.foldername(name))[1]
  );
