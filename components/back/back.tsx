import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

type BackButtonProps = {
  content?: string;
  href?: string;
};

export function BackButton({
  content = "Continue Shopping",
  href = "/catalog",
}: BackButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      asChild
      className="h-auto px-0 text-xs font-normal text-muted-foreground hover:bg-transparent hover:text-foreground has-[>svg]:px-0"
    >
      <Link href={href} className="justify-start">
        <ArrowLeft className="size-4" />
        {content}
      </Link>
    </Button>
  );
}
