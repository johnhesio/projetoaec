import { Link } from "react-router-dom"
import { AuthCard } from "@/components/layout/AuthCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function PatientLogin() {
  return (
    <AuthCard
      eyebrow="Área do paciente"
      title="Entrar"
      subtitle="Acesse suas consultas, ficha e consentimento LGPD."
      backTo="/paciente"
      backLabel="Área do paciente"
    >
      <form
        className="grid gap-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid gap-2">
          <Label htmlFor="paciente-email">E-mail ou CPF/CNPJ</Label>
          <Input id="paciente-email" type="text" autoComplete="username" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="paciente-senha">Senha</Label>
          <Input
            id="paciente-senha"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>
        <Button type="submit" className="mt-1">
          Entrar
        </Button>
      </form>

      <div className="mt-6 space-y-2 border-t border-linha pt-5 text-center text-sm">
        <p className="text-ink-muted">
          Não tem conta?{" "}
          <Link to="/paciente/cadastro" className="text-carimbo hover:underline">
            Criar conta
          </Link>
        </p>
        <p className="text-ink-muted">
          É profissional de saúde?{" "}
          <Link to="/profissional/entrar" className="text-carimbo hover:underline">
            Entrar por aqui
          </Link>
        </p>
      </div>
    </AuthCard>
  )
}

export default PatientLogin
