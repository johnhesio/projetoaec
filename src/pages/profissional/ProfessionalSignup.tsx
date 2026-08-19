import { useState, useRef } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Camera } from "lucide-react"
import { AuthCard } from "@/components/layout/AuthCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Chip } from "@/components/Chip"
import { ESPECIALIDADES } from "@/lib/especialidades"
import { signUpProfissional, traduzErro } from "@/lib/auth"

const CONSELHOS = ["CRM", "CRO", "CRP", "COREN", "CREFITO"]
const SERVICOS = ["Consulta", "Retorno", "Telemedicina", "Laudo", "Segunda opinião"]

function ProfessionalSignup() {
  const [fotoFile, setFotoFile] = useState<File | null>(null)
  const [fotoPreview, setFotoPreview] = useState<string | null>(null)
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [especialidade, setEspecialidade] = useState<string | null>(null)
  const [conselho, setConselho] = useState("CRM")
  const [conselhoNumero, setConselhoNumero] = useState("")
  const [servicos, setServicos] = useState<string[]>([])
  const [erro, setErro] = useState<string | null>(null)
  const [aviso, setAviso] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  function handleFoto(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFotoFile(file)
    setFotoPreview(URL.createObjectURL(file))
  }

  function toggleServico(servico: string) {
    setServicos((atual) =>
      atual.includes(servico)
        ? atual.filter((s) => s !== servico)
        : [...atual, servico]
    )
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setErro(null)
    setAviso(null)

    if (!especialidade) {
      setErro("Escolha sua especialidade.")
      return
    }
    if (servicos.length === 0) {
      setErro("Escolha ao menos um serviço oferecido.")
      return
    }

    setEnviando(true)
    const { data, error } = await signUpProfissional({
      nome,
      email,
      especialidade,
      conselhoTipo: conselho,
      conselhoNumero,
      servicos,
      senha,
      foto: fotoFile,
    })
    setEnviando(false)

    if (error) {
      setErro(traduzErro(error.message))
      return
    }
    if (!data.session) {
      setAviso("Cadastro criado. Confirme seu e-mail para entrar.")
      return
    }
    navigate("/profissional/painel")
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
      <form className="grid gap-6" onSubmit={handleSubmit}>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-linha bg-paper text-ink-muted transition-colors hover:border-carimbo/50"
            aria-label="Adicionar foto de perfil"
          >
            {fotoPreview ? (
              <img
                src={fotoPreview}
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
            <Input
              id="prof-nome"
              autoComplete="name"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="prof-email">E-mail</Label>
            <Input
              id="prof-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
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
              value={conselhoNumero}
              onChange={(e) => setConselhoNumero(e.target.value)}
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
            minLength={6}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <p className="text-xs leading-relaxed text-ink-muted">
          Seu número de conselho fica visível no seu perfil público como
          verificação. Validamos os dados antes de ativar sua agenda.
        </p>

        {erro && <p className="text-sm text-destructive">{erro}</p>}
        {aviso && <p className="text-sm text-vital">{aviso}</p>}

        <Button type="submit" className="mt-1" disabled={enviando}>
          {enviando ? "Criando cadastro…" : "Criar cadastro"}
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
