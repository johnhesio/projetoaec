import { TopBar } from "@/components/layout/TopBar"

function AuthCard({
  eyebrow,
  title,
  subtitle,
  backTo,
  backLabel,
  children,
  wide = false,
}: {
  eyebrow: string
  title: string
  subtitle: string
  backTo: string
  backLabel: string
  children: React.ReactNode
  wide?: boolean
}) {
  return (
    <div className="min-h-svh bg-paper text-ink">
      <TopBar backTo={backTo} backLabel={backLabel} />
      <main className="mx-auto flex justify-center px-6 py-16 sm:py-20">
        <div className={wide ? "w-full max-w-2xl" : "w-full max-w-md"}>
          <span className="font-data text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink-muted">
            {eyebrow}
          </span>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="mt-2 text-ink-muted">{subtitle}</p>
          <div className="mt-8 rounded-lg border border-linha bg-paper-raised p-6 sm:p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

export { AuthCard }
