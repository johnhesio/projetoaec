import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

function TopBar({ backTo, backLabel }: { backTo: string; backLabel: string }) {
  return (
    <header className="border-b border-linha">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-full border-2 border-carimbo text-carimbo">
            <span className="font-data text-xs font-bold">S</span>
          </span>
          <span className="font-data text-sm font-semibold tracking-[0.08em]">
            SANARE
          </span>
        </Link>
        <Link
          to={backTo}
          className="flex items-center gap-1.5 font-data text-xs uppercase tracking-[0.1em] text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-3.5" />
          {backLabel}
        </Link>
      </div>
    </header>
  )
}

export { TopBar }
