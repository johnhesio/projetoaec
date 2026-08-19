import { Button } from "@/components/ui/button"

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-semibold">Ambiente pronto</h1>
      <p className="text-muted-foreground">
        React + Tailwind CSS + shadcn/ui configurados.
      </p>
      <Button>Começar</Button>
    </div>
  )
}

export default App
