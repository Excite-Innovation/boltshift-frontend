import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SocialAuthButtonProps = {
  provider: string;
  icon: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export function SocialAuthButton({
  provider,
  icon,
  onClick,
  disabled,
  className,
}: SocialAuthButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn("min-w-35 py-2 px-4 border text-sm font-semibold rounded-lg", className)}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {provider}
    </Button>
  );
}
