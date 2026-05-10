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

export function EmptyWishlist() {
  const emptyWishlist = "/empty-profile/empty-wishlist.svg";
  const altDescription =
    "An elegant 3D illustration featuring a circular display podium centered between two large, interlocking heart outlines. The scene is decorated with gift boxes and shopping bags in shades of deep pink and purple, with small pink hearts floating in the background.";

  return (
    <Card className="w-full py-20 flex flex-col gap-10">
      <div>
        <Image
          src={emptyWishlist}
          width={256}
          height={256}
          alt={altDescription}
        />
      </div>

      <CardHeader className="w-full flex flex-col gap-2">
        <CardTitle className="text-3xl font-semibold text-primary">
          Your Wishlist Awaits
        </CardTitle>
        <CardDescription className="text-sm">
          Add items to your wishlist as you browse and they will magically
          appear here.
        </CardDescription>
      </CardHeader>

      <CardFooter className="w-full flex gap-3 justify-around">
        <Button className="text-base font-semibold">
          <ArrowLeft /> Browse Our Catalog
        </Button>

        <Button className="text-base font-semibold">
          <ShoppingCart /> Go To Your Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
