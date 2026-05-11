import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export function BackButton() {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-auto px-0 text-xs font-normal text-muted-foreground hover:bg-transparent hover:text-foreground"
      asChild
    >
      <Link href="/catalog">
        <ArrowLeft className="size-4" />
        Continue Shopping
      </Link>
    </Button>
  );
}
