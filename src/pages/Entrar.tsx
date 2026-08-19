import { Link } from "react-router-dom"
import { User, Stethoscope, ChevronRight } from "lucide-react"
import { TopBar } from "@/components/layout/TopBar"

function Entrar() {
  return (
    <div className="min-h-svh bg-paper text-ink">
      <TopBar backTo="/" backLabel="Início" />
      <main className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
        <span className="font-data text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink-muted">
          Entrar
        </span>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">
          Como você quer entrar?
        </h1>
        <p className="mt-2 text-ink-muted">
          Escolha a área certa pra acessar sua conta.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            to="/paciente/entrar"
            className="group flex flex-col items-start gap-3 rounded-lg border border-linha bg-paper-raised p-6 transition-colors hover:border-carimbo/50"
          >
            <User className="size-5 text-carimbo" />
            <div>
              <p className="font-display font-semibold">Sou paciente</p>
              <p className="mt-1 text-sm text-ink-muted">
                Consultas, ficha clínica e consentimento LGPD.
              </p>
            </div>
            <span className="mt-1 flex items-center gap-1 font-data text-xs uppercase tracking-[0.1em] text-carimbo">
              Entrar
              <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>

          <Link
            to="/profissional/entrar"
            className="group flex flex-col items-start gap-3 rounded-lg border border-linha bg-paper-raised p-6 transition-colors hover:border-carimbo/50"
          >
            <Stethoscope className="size-5 text-carimbo" />
            <div>
              <p className="font-display font-semibold">
                Sou profissional de saúde
              </p>
              <p className="mt-1 text-sm text-ink-muted">
                Agenda, fichas recebidas e seus serviços.
              </p>
            </div>
            <span className="mt-1 flex items-center gap-1 font-data text-xs uppercase tracking-[0.1em] text-carimbo">
              Entrar
              <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Entrar
