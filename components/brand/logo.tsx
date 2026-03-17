import { Logomark } from "@/components/brand/logomark";
import { Logotype } from "@/components/brand/logotype";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 h-10 sm:h-12 ${className}`}>
      <Logomark className="h-[36.67px] w-[36.67px] sm:h-11 sm:w-11" />

      <span className="hidden sm:inline-flex">
        <Logotype className="h-[21.84px] sm:w-[113.88px]"/>
      </span>
    </div>
  );
}
