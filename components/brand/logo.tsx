import { Logomark } from "@/components/brand/logomark";
import { Logotype } from "@/components/brand/logotype";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex h-10 items-center gap-2 sm:h-12 shrink-0", className)}>
      <Logomark className="h-[36.67px] w-[36.67px] shrink-0 sm:h-11 sm:w-11" />

      <span className="hidden shrink-0 sm:inline-flex">
        <Logotype className="h-[21.84px] sm:w-[113.88px]" />
      </span>
    </div>
  );
}
