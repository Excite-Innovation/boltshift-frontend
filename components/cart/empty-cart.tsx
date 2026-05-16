import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function EmptyCart() {
  const emptyCart = "/empty-profile/cart.png";
  const altDescription = "A shopping trolly.";

  return (
    <Card className="flex w-full flex-col items-center gap-10 border-0 py-20 text-center shadow-none">
      <div className="flex justify-center">
        <Image src={emptyCart} width={256} height={256} alt={altDescription} />
      </div>

      <CardHeader className="flex w-full flex-col items-center gap-2 text-center">
        <CardTitle className="text-3xl font-semibold text-primary">
          Cart's Feeling Light
        </CardTitle>
        <CardDescription className="max-w-88 text-sm">
          Your cart is longing for some company. Begin your shopping adventure
          now!
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild>
          <Link href="/catalog">
            <ArrowLeft /> Explore Our Catalog
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
