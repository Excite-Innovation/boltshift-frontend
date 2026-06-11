import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export function EmptyOrderPage() {
  return (
    <div className="border py-20 px-4 flex flex-col gap-10 items-center rounded-2xl">
      <Image
        src="/account/Empty0rder.svg"
        alt="No orders"
        width={256}
        height={256}
        className="w-64"
      />

      <div className="w-full flex flex-col gap-2 text-center">
        <p className="text-3xl font-semibold">No Orders Yet</p>
        <p className="text-sm text-muted-foreground">
          Start shopping to fill this space!
        </p>
      </div>

      <div className="w-full flex justify-center">
        <Button asChild size="lg">
          <Link href="/catalog">
            <ArrowLeft /> Browse Our Catalog
          </Link>
        </Button>
      </div>
    </div>
  );
}
