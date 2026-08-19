import { useState } from "react"
import type { FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthCard } from "@/components/layout/AuthCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Chip } from "@/components/Chip"
import { signUpPaciente, traduzErro } from "@/lib/auth"

type TipoConta = "pf" | "pj"

function PatientSignup() {
  const [tipo, setTipo] = useState<TipoConta>("pf")
  const [nome, setNome] = useState("")
  const [documento, setDocumento] = useState("")
  const [email, setEmail] = useState("")
  const [telefone, setTelefone] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState<string | null>(null)
  const [aviso, setAviso] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setErro(null)
    setAviso(null)

    const digitos = documento.replace(/\D/g, "")
    if (tipo === "pf" && digitos.length !== 11) {
      setErro("CPF precisa ter 11 dígitos.")
      return
    }
    if (tipo === "pj" && digitos.length !== 14) {
      setErro("CNPJ precisa ter 14 dígitos.")
      return
    }

    setEnviando(true)
    const { data, error } = await signUpPaciente({
      tipo,
      nome,
      documento,
      telefone,
      email,
      senha,
    })
    setEnviando(false)

    if (error) {
      setErro(traduzErro(error.message))
      return
    }
    if (!data.session) {
      setAviso("Conta criada. Confirme seu e-mail para entrar.")
      return
    }
    navigate("/paciente/painel")
  }

  return (
    <AuthCard
      eyebrow="Área do paciente"
      title="Criar conta"
      subtitle="Leva menos de dois minutos."
      backTo="/paciente"
      backLabel="Área do paciente"
    >
      <form className="grid gap-5" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label>Tipo de conta</Label>
          <div className="flex gap-2">
            <Chip
              selected={tipo === "pf"}
              onClick={() => setTipo("pf")}
              className="flex-1 py-2 text-center"
            >
              Pessoa física
            </Chip>
            <Chip
              selected={tipo === "pj"}
              onClick={() => setTipo("pj")}
              className="flex-1 py-2 text-center"
            >
              Pessoa jurídica
            </Chip>
          </div>
        </div>

        {tipo === "pf" ? (
          <>
            <div className="grid gap-2">
              <Label htmlFor="pac-nome">Nome completo</Label>
              <Input
                id="pac-nome"
                autoComplete="name"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pac-cpf">CPF</Label>
              <Input
                id="pac-cpf"
                inputMode="numeric"
                placeholder="000.000.000-00"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                required
              />
            </div>
          </>
        ) : (
          <>
            <div className="grid gap-2">
              <Label htmlFor="pac-razao">Razão social</Label>
              <Input
                id="pac-razao"
                autoComplete="organization"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pac-cnpj">CNPJ</Label>
              <Input
                id="pac-cnpj"
                inputMode="numeric"
                placeholder="00.000.000/0000-00"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                required
              />
            </div>
          </>
        )}

        <div className="grid gap-2">
          <Label htmlFor="pac-email">
            {tipo === "pf" ? "E-mail" : "E-mail corporativo"}
          </Label>
          <Input
            id="pac-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pac-telefone">Telefone</Label>
          <Input
            id="pac-telefone"
            type="tel"
            autoComplete="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pac-senha">Senha</Label>
          <Input
            id="pac-senha"
            type="password"
            autoComplete="new-password"
            minLength={6}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <p className="text-xs leading-relaxed text-ink-muted">
          Ao criar sua conta, você poderá revisar e assinar o consentimento
          LGPD antes da sua primeira consulta.
        </p>

        {erro && <p className="text-sm text-destructive">{erro}</p>}
        {aviso && <p className="text-sm text-vital">{aviso}</p>}

        <Button type="submit" className="mt-1" disabled={enviando}>
          {enviando ? "Criando conta…" : "Criar conta"}
        </Button>
      </form>

      <div className="mt-6 border-t border-linha pt-5 text-center text-sm text-ink-muted">
        Já tem conta?{" "}
        <Link to="/paciente/entrar" className="text-carimbo hover:underline">
          Entrar
        </Link>
      </div>
    </AuthCard>
  )
}

export default PatientSignup
