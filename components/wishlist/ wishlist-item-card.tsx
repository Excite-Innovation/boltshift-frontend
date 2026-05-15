import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function EmptyWishlist() {
  const emptyWishlist = "/empty-profile/wishlist.png";
  const altDescription =
    "An elegant 3D illustration featuring a circular display podium centered between two large, interlocking heart outlines. The scene is decorated with gift boxes and shopping bags in shades of deep pink and purple, with small pink hearts floating in the background.";

  return (
    <Card className="w-full items-center py-20 flex flex-col gap-10 text-center border-0 shadow-none">
      <div className="flex justify-center">
        <Image
          src={emptyWishlist}
          width={256}
          height={256}
          alt={altDescription}
        />
      </div>

      <CardHeader className="flex w-full flex-col items-center gap-2 text-center">
        <CardTitle className="text-3xl font-semibold text-primary">
          Your Wishlist Awaits
        </CardTitle>
        <CardDescription className="max-w-md text-sm">
          Add items to your wishlist as you browse and they will magically
          appear here.
        </CardDescription>
      </CardHeader>

      <CardFooter className="w-full flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button variant="outline" asChild>
          <Link href="/catalog">
            <ArrowLeft /> Browse Our Catalog
          </Link>
        </Button>

        <Button asChild>
          <Link href="/">
            <ShoppingCart /> Go To Your Cart
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
