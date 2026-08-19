import { useState, useRef } from "react"
import type { ChangeEvent } from "react"
import { Link } from "react-router-dom"
import { Camera } from "lucide-react"
import { AuthCard } from "@/components/layout/AuthCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Chip } from "@/components/Chip"
import { ESPECIALIDADES } from "@/lib/especialidades"

const CONSELHOS = ["CRM", "CRO", "CRP", "COREN", "CREFITO"]
const SERVICOS = ["Consulta", "Retorno", "Telemedicina", "Laudo", "Segunda opinião"]

function ProfessionalSignup() {
  const [foto, setFoto] = useState<string | null>(null)
  const [especialidade, setEspecialidade] = useState<string | null>(null)
  const [conselho, setConselho] = useState("CRM")
  const [servicos, setServicos] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFoto(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setFoto(reader.result as string)
    reader.readAsDataURL(file)
  }

  function toggleServico(servico: string) {
    setServicos((atual) =>
      atual.includes(servico)
        ? atual.filter((s) => s !== servico)
        : [...atual, servico]
    )
  }

  return (
    <AuthCard
      eyebrow="Área do profissional"
      title="Criar cadastro"
      subtitle="Seu perfil fica visível pra quem busca sua especialidade."
      backTo="/profissional"
      backLabel="Área do profissional"
      wide
    >
      <form className="grid gap-6" onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-linha bg-paper text-ink-muted transition-colors hover:border-carimbo/50"
            aria-label="Adicionar foto de perfil"
          >
            {foto ? (
              <img
                src={foto}
                alt="Prévia da foto de perfil"
                className="size-full object-cover"
              />
            ) : (
              <Camera className="size-5" />
            )}
          </button>
          <div>
            <p className="font-display text-sm font-semibold">Foto de perfil</p>
            <p className="text-xs text-ink-muted">JPG ou PNG, até 5MB.</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleFoto}
              className="hidden"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="prof-nome">Nome completo</Label>
            <Input id="prof-nome" autoComplete="name" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="prof-email">E-mail</Label>
            <Input id="prof-email" type="email" autoComplete="email" required />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Especialidade</Label>
          <div className="flex flex-wrap gap-2">
            {ESPECIALIDADES.map((esp) => (
              <Chip
                key={esp}
                selected={especialidade === esp}
                onClick={() => setEspecialidade(esp)}
              >
                {esp}
              </Chip>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-[auto_1fr]">
          <div className="grid gap-2">
            <Label>Conselho</Label>
            <div className="flex flex-wrap gap-2">
              {CONSELHOS.map((c) => (
                <Chip
                  key={c}
                  selected={conselho === c}
                  onClick={() => setConselho(c)}
                >
                  {c}
                </Chip>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="prof-conselho-numero">
              Número do conselho (com UF)
            </Label>
            <Input
              id="prof-conselho-numero"
              placeholder={`${conselho}-SP 123.456`}
              required
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Serviços oferecidos</Label>
          <div className="flex flex-wrap gap-2">
            {SERVICOS.map((servico) => (
              <Chip
                key={servico}
                selected={servicos.includes(servico)}
                onClick={() => toggleServico(servico)}
              >
                {servico}
              </Chip>
            ))}
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="prof-senha">Senha</Label>
          <Input
            id="prof-senha"
            type="password"
            autoComplete="new-password"
            required
          />
        </div>

        <p className="text-xs leading-relaxed text-ink-muted">
          Seu número de conselho fica visível no seu perfil público como
          verificação. Validamos os dados antes de ativar sua agenda.
        </p>

        <Button type="submit" className="mt-1">
          Criar cadastro
        </Button>
      </form>

      <div className="mt-6 border-t border-linha pt-5 text-center text-sm text-ink-muted">
        Já tem conta?{" "}
        <Link to="/profissional/entrar" className="text-carimbo hover:underline">
          Entrar
        </Link>
      </div>
    </AuthCard>
  )
}

export default ProfessionalSignup
