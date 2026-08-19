import { cn } from "@/lib/utils"

function Chip({
  selected,
  className,
  ...props
}: React.ComponentProps<"button"> & { selected?: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "rounded-full border px-3.5 py-1.5 font-data text-xs transition-colors",
        selected
          ? "border-carimbo bg-carimbo text-primary-foreground"
          : "border-linha bg-paper text-ink-muted hover:border-carimbo/50 hover:text-ink",
        className
      )}
      {...props}
    />
  )
}

export { Chip }
