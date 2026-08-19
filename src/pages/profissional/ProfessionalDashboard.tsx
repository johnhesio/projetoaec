import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LogOut } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { signOut } from "@/lib/auth"
import { useSession } from "@/hooks/useSession"
import { Button } from "@/components/ui/button"
import { Stamp } from "@/components/Stamp"
import { TopBar } from "@/components/layout/TopBar"

type Profissional = {
  nome: string
  especialidade: string
  conselho_tipo: string
  conselho_numero: string
  servicos: string[]
  foto_url: string | null
  verificado: boolean
}

function ProfessionalDashboard() {
  const { session } = useSession()
  const [profissional, setProfissional] = useState<Profissional | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!session) return
    supabase
      .from("profissionais")
      .select("nome, especialidade, conselho_tipo, conselho_numero, servicos, foto_url, verificado")
      .eq("id", session.user.id)
      .single()
      .then(({ data }) => setProfissional(data))
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
          Área do profissional
        </span>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">
          Olá{profissional ? `, ${profissional.nome.split(" ")[0]}` : ""}.
        </h1>
        <p className="mt-2 text-ink-muted">
          Sua conta está conectada ao Supabase.
        </p>

        <div className="mt-8 rounded-lg border border-linha bg-paper-raised p-6">
          {profissional ? (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted font-display text-lg font-semibold text-ink-muted">
                    {profissional.foto_url ? (
                      <img
                        src={profissional.foto_url}
                        alt=""
                        className="size-full object-cover"
                      />
                    ) : (
                      profissional.nome.slice(0, 2).toUpperCase()
                    )}
                  </div>
                  <div>
                    <p className="font-display font-semibold">
                      {profissional.nome}
                    </p>
                    <p className="text-sm text-ink-muted">
                      {profissional.especialidade}
                    </p>
                  </div>
                </div>
                {profissional.verificado && (
                  <Stamp rotate={-6}>Verificado</Stamp>
                )}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-linha pt-5 font-data text-sm">
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-ink-muted">
                    Conselho
                  </p>
                  <p className="mt-1">
                    {profissional.conselho_tipo} {profissional.conselho_numero}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-ink-muted">
                    E-mail
                  </p>
                  <p className="mt-1">{session?.user.email}</p>
                </div>
              </div>
              {profissional.servicos.length > 0 && (
                <div className="mt-5 border-t border-linha pt-5">
                  <p className="font-data text-xs uppercase tracking-[0.1em] text-ink-muted">
                    Serviços
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {profissional.servicos.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-vital-bg px-3 py-1 font-data text-xs text-vital"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {!profissional.verificado && (
                <p className="mt-5 border-t border-linha pt-5 text-xs leading-relaxed text-ink-muted">
                  Seu número de conselho ainda está em análise. Assim que
                  verificado, seu perfil ganha o selo público.
                </p>
              )}
            </>
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

export default ProfessionalDashboard
