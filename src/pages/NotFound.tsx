import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Stamp } from "@/components/Stamp"

function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-paper px-6 text-center text-ink">
      <Stamp rotate={-6} className="text-base">
        404
      </Stamp>
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Essa página não foi encontrada.
        </h1>
        <p className="mt-2 text-ink-muted">
          Confira o endereço ou volte para o início.
        </p>
      </div>
      <Button asChild>
        <Link to="/">Voltar ao início</Link>
      </Button>
    </div>
  )
}

export default NotFound
