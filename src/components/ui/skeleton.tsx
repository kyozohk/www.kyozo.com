import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      style={{
        minHeight: props.style?.height || '1rem',
        height: props.style?.height || '1rem'
      }}
      {...props}
    />
  )
}

export { Skeleton }
