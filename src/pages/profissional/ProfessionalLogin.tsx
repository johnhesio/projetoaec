import { useState } from "react"
import type { FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthCard } from "@/components/layout/AuthCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signInProfissional, traduzErro } from "@/lib/auth"

function ProfessionalLogin() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setErro(null)
    setEnviando(true)
    const { error } = await signInProfissional(email, senha)
    setEnviando(false)
    if (error) {
      setErro(traduzErro(error.message))
      return
    }
    navigate("/profissional/painel")
  }

  return (
    <AuthCard
      eyebrow="Área do profissional"
      title="Entrar"
      subtitle="Acesse sua agenda, fichas recebidas e seu perfil."
      backTo="/profissional"
      backLabel="Área do profissional"
    >
      <form className="grid gap-5" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="prof-email">E-mail</Label>
          <Input
            id="prof-email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="prof-senha">Senha</Label>
          <Input
            id="prof-senha"
            type="password"
            autoComplete="current-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        {erro && <p className="text-sm text-destructive">{erro}</p>}
        <Button type="submit" className="mt-1" disabled={enviando}>
          {enviando ? "Entrando…" : "Entrar"}
        </Button>
      </form>

      <div className="mt-6 space-y-2 border-t border-linha pt-5 text-center text-sm">
        <p className="text-ink-muted">
          Ainda não tem cadastro?{" "}
          <Link
            to="/profissional/cadastro"
            className="text-carimbo hover:underline"
          >
            Criar cadastro
          </Link>
        </p>
        <p className="text-ink-muted">
          É paciente?{" "}
          <Link to="/paciente/entrar" className="text-carimbo hover:underline">
            Entrar por aqui
          </Link>
        </p>
      </div>
    </AuthCard>
  )
}

export default ProfessionalLogin
