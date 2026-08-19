import { Link } from "react-router-dom"
import { CalendarCheck, Inbox, Stethoscope, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TopBar } from "@/components/layout/TopBar"

function ProfessionalArea() {
  return (
    <div className="min-h-svh bg-paper text-ink">
      <TopBar backTo="/" backLabel="Início" />
      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <span className="font-data text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink-muted">
          Área do profissional
        </span>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Seu consultório, com endereço próprio na internet.
        </h1>
        <p className="mt-3 max-w-lg text-ink-muted">
          Compartilhe sua agenda, receba fichas antes da consulta e devolva
          orientações direto pela plataforma.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/profissional/cadastro">Criar meu cadastro</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/profissional/entrar">Já tenho conta</Link>
          </Button>
        </div>

        <ul className="mt-12 grid gap-6 border-t border-linha pt-10 sm:grid-cols-3">
          <li className="flex items-start gap-3">
            <CalendarCheck className="mt-0.5 size-4 shrink-0 text-carimbo" />
            <p className="text-sm text-ink-muted">
              Compartilhe sua agenda com um link só seu
            </p>
          </li>
          <li className="flex items-start gap-3">
            <Inbox className="mt-0.5 size-4 shrink-0 text-carimbo" />
            <p className="text-sm text-ink-muted">
              Receba e devolva fichas clínicas
            </p>
          </li>
          <li className="flex items-start gap-3">
            <User className="mt-0.5 size-4 shrink-0 text-carimbo" />
            <p className="text-sm text-ink-muted">
              Perfil com foto, especialidade e serviços
            </p>
          </li>
        </ul>

        <Link
          to="/paciente"
          className="mt-10 flex items-center gap-2 font-data text-xs uppercase tracking-[0.1em] text-ink-muted transition-colors hover:text-ink"
        >
          <Stethoscope className="size-3.5" />É paciente? Acesse a área do
          paciente
        </Link>
      </main>
    </div>
  )
}

export default ProfessionalArea
