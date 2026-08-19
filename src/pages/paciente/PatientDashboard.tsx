import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LogOut } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { signOut } from "@/lib/auth"
import { useSession } from "@/hooks/useSession"
import { Button } from "@/components/ui/button"
import { TopBar } from "@/components/layout/TopBar"

type Paciente = {
  nome: string
  tipo: "pf" | "pj"
  documento: string
  telefone: string
}

function PatientDashboard() {
  const { session } = useSession()
  const [paciente, setPaciente] = useState<Paciente | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!session) return
    supabase
      .from("pacientes")
      .select("nome, tipo, documento, telefone")
      .eq("id", session.user.id)
      .single()
      .then(({ data }) => setPaciente(data))
  }, [session])

  async function handleSair() {
    await signOut()
    navigate("/")
  }

  return (
    <div className="min-h-svh bg-paper text-ink">
      <TopBar backTo="/" backLabel="Início" />
      <main className="mx-auto max-w-2xl px-6 py-16">
        <span className="font-data text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink-muted">
          Área do paciente
        </span>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">
          Olá{paciente ? `, ${paciente.nome.split(" ")[0]}` : ""}.
        </h1>
        <p className="mt-2 text-ink-muted">
          Sua conta está conectada ao Supabase.
        </p>

        <div className="mt-8 rounded-lg border border-linha bg-paper-raised p-6">
          {paciente ? (
            <dl className="grid grid-cols-2 gap-4 font-data text-sm">
              <div>
                <dt className="text-xs uppercase tracking-[0.1em] text-ink-muted">
                  Tipo de conta
                </dt>
                <dd className="mt-1">
                  {paciente.tipo === "pf" ? "Pessoa física" : "Pessoa jurídica"}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.1em] text-ink-muted">
                  Documento
                </dt>
                <dd className="mt-1">{paciente.documento}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.1em] text-ink-muted">
                  Telefone
                </dt>
                <dd className="mt-1">{paciente.telefone}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.1em] text-ink-muted">
                  E-mail
                </dt>
                <dd className="mt-1">{session?.user.email}</dd>
              </div>
            </dl>
          ) : (
            <p className="font-data text-sm text-ink-muted">Carregando…</p>
          )}
        </div>

        <Button variant="outline" className="mt-8 gap-2" onClick={handleSair}>
          <LogOut className="size-4" />
          Sair
        </Button>
      </main>
    </div>
  )
}

export default PatientDashboard
