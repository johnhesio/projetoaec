import { Link } from "react-router-dom"
import { Search, FileText, ShieldCheck, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TopBar } from "@/components/layout/TopBar"

function PatientArea() {
  return (
    <div className="min-h-svh bg-paper text-ink">
      <TopBar backTo="/" backLabel="Início" />
      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <span className="font-data text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink-muted">
          Área do paciente
        </span>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Sua saúde, organizada num só lugar.
        </h1>
        <p className="mt-3 max-w-lg text-ink-muted">
          Marque consultas com quem você escolher, envie sua ficha antes do
          atendimento e mantenha seu consentimento LGPD sempre em dia.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/paciente/cadastro">Criar minha conta</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/paciente/entrar">Já tenho conta</Link>
          </Button>
        </div>

        <ul className="mt-12 grid gap-6 border-t border-linha pt-10 sm:grid-cols-3">
          <li className="flex items-start gap-3">
            <Search className="mt-0.5 size-4 shrink-0 text-carimbo" />
            <p className="text-sm text-ink-muted">
              Busque especialistas por área ou cidade
            </p>
          </li>
          <li className="flex items-start gap-3">
            <FileText className="mt-0.5 size-4 shrink-0 text-carimbo" />
            <p className="text-sm text-ink-muted">
              Envie sua ficha clínica antes da consulta
            </p>
          </li>
          <li className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-carimbo" />
            <p className="text-sm text-ink-muted">
              Assine seu consentimento LGPD com validade
            </p>
          </li>
        </ul>

        <Link
          to="/profissional"
          className="mt-10 flex items-center gap-2 font-data text-xs uppercase tracking-[0.1em] text-ink-muted transition-colors hover:text-ink"
        >
          <Stethoscope className="size-3.5" />É profissional de saúde? Acesse
          a área profissional
        </Link>
      </main>
    </div>
  )
}

export default PatientArea
