import { Logomark } from "./logomark"
import { Logotype } from "./logotype"

export function Logo({
  className,
}: {
  className?: string
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Logomark className="h-full w-auto" />
      <Logotype className="h-full w-auto" />
    </div>
  )
}