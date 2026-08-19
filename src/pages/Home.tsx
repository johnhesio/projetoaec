import { useState } from "react"
import {
  Search,
  ShieldCheck,
  FileText,
  CalendarCheck,
  Stethoscope,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Stamp } from "@/components/Stamp"

const ESPECIALIDADES = [
  "Cardiologia",
  "Dermatologia",
  "Psiquiatria",
  "Pediatria",
  "Ginecologia",
  "Ortopedia",
]

const PASSOS_PACIENTE = [
  {
    titulo: "Buscar",
    texto: "Filtre por especialidade, cidade ou convênio.",
  },
  {
    titulo: "Agendar",
    texto: "Escolha um horário direto na agenda do profissional.",
  },
  {
    titulo: "Enviar sua ficha",
    texto: "Preencha o formulário clínico antes da consulta.",
  },
  {
    titulo: "Assinar o LGPD",
    texto: "Aceite o consentimento digitalmente ou imprima para assinar.",
  },
]

const PASSOS_PROFISSIONAL = [
  {
    titulo: "Cadastre-se",
    texto: "Foto, especialidade e número do conselho.",
  },
  {
    titulo: "Liste seus serviços",
    texto: "Consultas, retornos, telemedicina — você decide.",
  },
  {
    titulo: "Compartilhe sua agenda",
    texto: "Um link só seu, sem trocar mensagem pra marcar horário.",
  },
  {
    titulo: "Receba e devolva fichas",
    texto: "Veja o histórico clínico e responda direto pela plataforma.",
  },
]

function FieldEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-data text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink-muted">
      {children}
    </span>
  )
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-svh bg-paper text-ink">
      <header className="border-b border-linha">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-full border-2 border-carimbo text-carimbo">
              <span className="font-data text-xs font-bold">S</span>
            </span>
            <span className="font-data text-sm font-semibold tracking-[0.08em]">
              SANARE
            </span>
          </div>
          <nav className="hidden items-center gap-8 font-data text-xs uppercase tracking-[0.1em] text-ink-muted sm:flex">
            <a href="#pacientes" className="transition-colors hover:text-ink">
              Para pacientes
            </a>
            <a
              href="#profissionais"
              className="transition-colors hover:text-ink"
            >
              Para profissionais
            </a>
            <a href="#lgpd" className="transition-colors hover:text-ink">
              LGPD
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="font-data text-xs">
              Entrar
            </Button>
            <button
              type="button"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex size-9 items-center justify-center rounded-md border border-linha text-ink sm:hidden"
            >
              {menuOpen ? (
                <X className="size-4" />
              ) : (
                <Menu className="size-4" />
              )}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="flex flex-col gap-4 border-t border-linha px-6 py-5 font-data text-xs uppercase tracking-[0.1em] text-ink-muted sm:hidden">
            <a
              href="#pacientes"
              onClick={() => setMenuOpen(false)}
              className="hover:text-ink"
            >
              Para pacientes
            </a>
            <a
              href="#profissionais"
              onClick={() => setMenuOpen(false)}
              className="hover:text-ink"
            >
              Para profissionais
            </a>
            <a
              href="#lgpd"
              onClick={() => setMenuOpen(false)}
              className="hover:text-ink"
            >
              LGPD
            </a>
          </nav>
        )}
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2">
                <FieldEyebrow>Agenda compartilhável</FieldEyebrow>
                <span className="text-linha">·</span>
                <FieldEyebrow>Ficha digital</FieldEyebrow>
                <span className="text-linha">·</span>
                <FieldEyebrow>Consentimento LGPD</FieldEyebrow>
              </div>
              <h1 className="font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl">
                Marcar consulta não devia ser burocracia.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-muted">
                O Sanare junta agenda, ficha clínica e consentimento LGPD num
                só lugar — para quem cuida e para quem é cuidado.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-2">
                  <Search className="size-4" />
                  Buscar especialista
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Stethoscope className="size-4" />
                  Sou profissional de saúde
                </Button>
              </div>
            </div>

            {/* Appointment card mock */}
            <div className="relative mx-auto w-full max-w-sm">
              <div className="animate-in fade-in slide-in-from-bottom-4 rounded-lg border border-linha bg-paper-raised p-6 shadow-[0_1px_0_theme(colors.linha)] duration-700">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-display text-lg font-semibold">
                      Dra. Ana Souza
                    </p>
                    <p className="text-sm text-ink-muted">Cardiologista</p>
                  </div>
                  <Stamp
                    rotate={-8}
                    className="animate-in zoom-in-50 fade-in delay-300 duration-500"
                  >
                    Verificado
                  </Stamp>
                </div>
                <p className="mt-2 font-data text-xs text-ink-muted">
                  CRM-SP 123.456
                </p>
                <div className="my-5 border-t border-dashed border-linha" />
                <div className="flex items-center justify-between">
                  <div>
                    <FieldEyebrow>Próximo horário</FieldEyebrow>
                    <p className="mt-1 font-data text-sm font-medium">
                      Qui, 21 ago · 14:30
                    </p>
                  </div>
                  <CalendarCheck className="size-5 text-vital" />
                </div>
                <Button className="mt-5 w-full" size="sm">
                  Confirmar horário
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Busca */}
        <section id="pacientes" className="border-t border-linha bg-paper-raised">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <FieldEyebrow>Busca por especialidade</FieldEyebrow>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight">
              Encontre quem trata do que você precisa.
            </h2>
            <div className="mt-8 flex items-center gap-3 rounded-md border border-linha bg-paper px-4 py-3 sm:max-w-xl">
              <Search className="size-4 shrink-0 text-ink-muted" />
              <span className="text-sm text-ink-muted">
                Buscar por especialidade, nome ou cidade
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {ESPECIALIDADES.map((especialidade) => (
                <span
                  key={especialidade}
                  className="rounded-full border border-linha bg-paper px-3.5 py-1.5 font-data text-xs text-ink-muted"
                >
                  {especialidade}
                </span>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { nome: "Dr. Marcos Lima", esp: "Ortopedia", crm: "CRM-RJ 88.213" },
                { nome: "Dra. Ana Souza", esp: "Cardiologia", crm: "CRM-SP 123.456" },
                { nome: "Dra. Beatriz Nunes", esp: "Dermatologia", crm: "CRM-MG 45.902" },
              ].map((medico) => (
                <div
                  key={medico.nome}
                  className="rounded-lg border border-linha bg-paper p-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-display font-semibold">{medico.nome}</p>
                    <Stamp rotate={4} className="scale-90">
                      CRM ok
                    </Stamp>
                  </div>
                  <p className="mt-1 text-sm text-ink-muted">{medico.esp}</p>
                  <p className="mt-3 font-data text-xs text-ink-muted">
                    {medico.crm}
                  </p>
                  <Button variant="outline" size="sm" className="mt-4 w-full">
                    Ver agenda
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Como funciona - paciente */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <FieldEyebrow>Como funciona · paciente</FieldEyebrow>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight">
            Da busca à consulta, sem ida e volta de mensagem.
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PASSOS_PACIENTE.map((passo, i) => (
              <li key={passo.titulo}>
                <span className="font-data text-sm text-carimbo">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 font-display font-semibold">
                  {passo.titulo}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {passo.texto}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Como funciona - profissional */}
        <section
          id="profissionais"
          className="border-t border-linha bg-paper-raised"
        >
          <div className="mx-auto max-w-6xl px-6 py-20">
            <FieldEyebrow>Como funciona · profissional</FieldEyebrow>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight">
              Seu consultório, com endereço próprio na internet.
            </h2>
            <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <ol className="grid gap-8 sm:grid-cols-2">
                {PASSOS_PROFISSIONAL.map((passo, i) => (
                  <li key={passo.titulo}>
                    <span className="font-data text-sm text-carimbo">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-3 font-display font-semibold">
                      {passo.titulo}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                      {passo.texto}
                    </p>
                  </li>
                ))}
              </ol>

              {/* Profile mock */}
              <div className="rounded-lg border border-linha bg-paper p-6">
                <div className="flex items-center gap-4">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-muted font-display text-lg font-semibold text-ink-muted">
                    MS
                  </div>
                  <div>
                    <p className="font-display font-semibold">
                      Dr. Marcos Lima
                    </p>
                    <p className="text-sm text-ink-muted">
                      Ortopedia e Traumatologia
                    </p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-linha pt-5">
                  <div>
                    <FieldEyebrow>Conselho</FieldEyebrow>
                    <p className="mt-1 font-data text-sm">CRM-RJ 88.213</p>
                  </div>
                  <div>
                    <FieldEyebrow>Atendimento</FieldEyebrow>
                    <p className="mt-1 font-data text-sm">Presencial · Telemedicina</p>
                  </div>
                </div>
                <div className="mt-5 border-t border-linha pt-5">
                  <FieldEyebrow>Serviços oferecidos</FieldEyebrow>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["Consulta", "Retorno", "Laudo", "Segunda opinião"].map(
                      (s) => (
                        <span
                          key={s}
                          className="rounded-full bg-vital-bg px-3 py-1 font-data text-xs text-vital"
                        >
                          {s}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ficha + LGPD */}
        <section id="lgpd" className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <FieldEyebrow>Ficha clínica</FieldEyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
                O histórico vai e volta, sem se perder no e-mail.
              </h2>
              <p className="mt-4 leading-relaxed text-ink-muted">
                O paciente preenche a ficha antes da consulta. O profissional
                recebe, avalia e devolve com orientações — tudo dentro do
                mesmo atendimento, com data e hora registradas.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-start gap-2.5">
                  <FileText className="mt-0.5 size-4 shrink-0 text-carimbo" />
                  Formulário clínico adaptado por especialidade
                </li>
                <li className="flex items-start gap-2.5">
                  <FileText className="mt-0.5 size-4 shrink-0 text-carimbo" />
                  Retorno do profissional anexado ao histórico do paciente
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-linha bg-paper-raised p-7">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="size-5 text-carimbo" />
                  <p className="font-display font-semibold">
                    Consentimento LGPD
                  </p>
                </div>
                <Stamp rotate={-5}>Assinado</Stamp>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                Antes da primeira consulta, o paciente aceita formalmente o
                uso dos seus dados clínicos. A assinatura pode ser digital,
                com validade jurídica, ou impressa para assinar à mão.
              </p>
              <div className="mt-5 space-y-3 border-t border-linha pt-5 font-data text-xs text-ink-muted">
                <p>· Consentimento explícito, por atendimento</p>
                <p>· Dado clínico nunca compartilhado sem autorização</p>
                <p>· Exportação e exclusão dos dados a qualquer momento</p>
              </div>
              <div className="mt-6 flex gap-3">
                <Button size="sm" className="flex-1">
                  Assinar digitalmente
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Imprimir termo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-linha">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-full border-2 border-carimbo text-carimbo">
                  <span className="font-data text-[0.6rem] font-bold">S</span>
                </span>
                <span className="font-data text-sm font-semibold tracking-[0.08em]">
                  SANARE
                </span>
              </div>
              <p className="mt-3 max-w-[22ch] text-sm text-ink-muted">
                Agenda, ficha e consentimento — num só lugar.
              </p>
            </div>
            <div>
              <FieldEyebrow>Para pacientes</FieldEyebrow>
              <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                <li>Buscar especialista</li>
                <li>Minha ficha clínica</li>
                <li>Meu consentimento LGPD</li>
              </ul>
            </div>
            <div>
              <FieldEyebrow>Para profissionais</FieldEyebrow>
              <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                <li>Criar cadastro</li>
                <li>Minha agenda</li>
                <li>Fichas recebidas</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-2 border-t border-linha pt-6 font-data text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Sanare</p>
            <div className="flex gap-5">
              <span>Termos</span>
              <span>Privacidade</span>
              <span>LGPD</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
