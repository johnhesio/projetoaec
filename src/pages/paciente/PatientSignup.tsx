import { useState } from "react"
import { Link } from "react-router-dom"
import { AuthCard } from "@/components/layout/AuthCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Chip } from "@/components/Chip"

type TipoConta = "pf" | "pj"

function PatientSignup() {
  const [tipo, setTipo] = useState<TipoConta>("pf")

  return (
    <AuthCard
      eyebrow="Área do paciente"
      title="Criar conta"
      subtitle="Leva menos de dois minutos."
      backTo="/paciente"
      backLabel="Área do paciente"
    >
      <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
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
              <Input id="pac-nome" autoComplete="name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pac-cpf">CPF</Label>
              <Input id="pac-cpf" inputMode="numeric" placeholder="000.000.000-00" required />
            </div>
          </>
        ) : (
          <>
            <div className="grid gap-2">
              <Label htmlFor="pac-razao">Razão social</Label>
              <Input id="pac-razao" autoComplete="organization" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pac-cnpj">CNPJ</Label>
              <Input id="pac-cnpj" inputMode="numeric" placeholder="00.000.000/0000-00" required />
            </div>
          </>
        )}

        <div className="grid gap-2">
          <Label htmlFor="pac-email">
            {tipo === "pf" ? "E-mail" : "E-mail corporativo"}
          </Label>
          <Input id="pac-email" type="email" autoComplete="email" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pac-telefone">Telefone</Label>
          <Input id="pac-telefone" type="tel" autoComplete="tel" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pac-senha">Senha</Label>
          <Input
            id="pac-senha"
            type="password"
            autoComplete="new-password"
            required
          />
        </div>

        <p className="text-xs leading-relaxed text-ink-muted">
          Ao criar sua conta, você poderá revisar e assinar o consentimento
          LGPD antes da sua primeira consulta.
        </p>

        <Button type="submit" className="mt-1">
          Criar conta
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
