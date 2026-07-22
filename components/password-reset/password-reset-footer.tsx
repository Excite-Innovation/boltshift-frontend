import { Mail, PhoneOutgoing } from "lucide-react";

import { cn } from "@/lib/utils";

type PasswordResetFooterProps = {
  className?: string;
  iconSize?: string;
};

export function PasswordResetFooter({
  className = "",
  iconSize = "size-5",
}: PasswordResetFooterProps) {
  return (
    <footer className={cn("flex flex-col items-center gap-2 text-sm text-muted-foreground", className)}>
      <a
        href="mailto:help@excite.company"
        className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
      >
        <Mail className={iconSize} />
        help@excite.company
      </a>

      <a
        href="tel:+254700111111"
        className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
      >
        <PhoneOutgoing className={iconSize} />
        +254 700 111 111
      </a>
    </footer>
  );
}
