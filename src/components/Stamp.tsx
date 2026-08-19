import { cn } from "@/lib/utils"

function Stamp({
  className,
  rotate = -6,
  children,
}: {
  className?: string
  rotate?: number
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        "inline-flex select-none items-center justify-center rounded-full border-2 border-carimbo/70 px-3 py-1 font-data text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-carimbo",
        className
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  )
}

export { Stamp }
