import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SocialAuthButtonProps = {
  provider: string;
  icon: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  showLabel?: boolean;
  "aria-label"?: string;
};

export function SocialAuthButton({
  provider,
  icon,
  onClick,
  disabled,
  className,
  showLabel = true,
  "aria-label": ariaLabel,
}: SocialAuthButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn(
        "min-w-35 rounded-lg border px-4 py-2 text-sm font-semibold",
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      aria-label={
        ariaLabel ?? (showLabel ? undefined : `Continue with ${provider}`)
      }
    >
      {icon}
      {showLabel ? provider : <span className="sr-only">{provider}</span>}
    </Button>
  );
}
