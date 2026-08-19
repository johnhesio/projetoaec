import { supabase } from "@/lib/supabase"

const MENSAGENS_ERRO: Record<string, string> = {
  "Invalid login credentials": "E-mail ou senha incorretos.",
  "User already registered": "Já existe uma conta com esse e-mail.",
  "Email not confirmed": "Confirme seu e-mail antes de entrar.",
  "Password should be at least 6 characters": "A senha precisa ter pelo menos 6 caracteres.",
  "Failed to fetch": "Não foi possível conectar. Verifique sua internet ou tente novamente.",
}

export function traduzErro(mensagem: string): string {
  return MENSAGENS_ERRO[mensagem] ?? mensagem
}

type SignUpPacienteInput = {
  tipo: "pf" | "pj"
  nome: string
  documento: string
  telefone: string
  email: string
  senha: string
}

export async function signUpPaciente(input: SignUpPacienteInput) {
  return supabase.auth.signUp({
    email: input.email,
    password: input.senha,
    options: {
      data: {
        role: "paciente",
        tipo: input.tipo,
        nome: input.nome,
        documento: input.documento,
        telefone: input.telefone,
      },
    },
  })
}

export async function signInPaciente(email: string, senha: string) {
  return supabase.auth.signInWithPassword({ email, password: senha })
}

type SignUpProfissionalInput = {
  nome: string
  email: string
  especialidade: string
  conselhoTipo: string
  conselhoNumero: string
  servicos: string[]
  senha: string
  foto: File | null
}

export async function signUpProfissional(input: SignUpProfissionalInput) {
  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.senha,
    options: {
      data: {
        role: "profissional",
        nome: input.nome,
        especialidade: input.especialidade,
        conselho_tipo: input.conselhoTipo,
        conselho_numero: input.conselhoNumero,
        servicos: input.servicos,
      },
    },
  })

  if (error || !data.user) return { data, error }

  // Sem confirmação de e-mail pendente: já há sessão, dá pra enviar a foto agora.
  if (data.session && input.foto) {
    const caminho = `${data.user.id}/${input.foto.name}`
    const { error: erroUpload } = await supabase.storage
      .from("avatares")
      .upload(caminho, input.foto, { upsert: true })

    if (!erroUpload) {
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatares").getPublicUrl(caminho)
      await supabase
        .from("profissionais")
        .update({ foto_url: publicUrl })
        .eq("id", data.user.id)
    }
  }

  return { data, error: null }
}

export async function signInProfissional(email: string, senha: string) {
  return supabase.auth.signInWithPassword({ email, password: senha })
}

export async function signOut() {
  return supabase.auth.signOut()
}
