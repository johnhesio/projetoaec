import { Navigate } from "react-router-dom"
import { useSession } from "@/hooks/useSession"

function ProtectedRoute({
  children,
  redirectTo,
}: {
  children: React.ReactNode
  redirectTo: string
}) {
  const { session, carregando } = useSession()

  if (carregando) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-paper font-data text-sm text-ink-muted">
        Carregando…
      </div>
    )
  }

  if (!session) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
