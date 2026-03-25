import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Product, ProductVariant } from "@/lib/type";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import FlipClock from "@/components/ui/flip-clock";
import { EditNum, GetRatio } from "@/lib/utils";

type ProductCardProps = {
  variant?: ProductVariant;
  product: Product;
};

function CardImage({ product, ratio }: { product: Product; ratio: number }) {
  return (
    <div className="relative">
      <AspectRatio ratio={ratio}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover w-full h-full overflow-hidden"
        />
      </AspectRatio>

      <Button
        variant="outline"
        size="icon-sm"
        className="bg-background/50 border-0 h-8 w-8 absolute top-2 right-2 rounded-full hover:cursor-pointer hover:bg-background/50"
      >
        <Heart />
      </Button>
    </div>
  );
}

function DefaultContent({
  product,
  price,
}: {
  product: Product;
  price: string;
}) {
  return (
    <>
      <div>
        <p className="text-xs font-medium truncate">{product.name}</p>
        <p className="text-primary">
          <span className="text-xs">Kshs.</span>
          <span className="text-xs font-medium">{price}</span>
        </p>
      </div>

      <div className="w-full flex items-center gap-1">
        <Progress value={product.progress} className="flex-1 h-1" />

        <div className="flex items-center gap-1 shrink-0">
          <img
            src="/hot-deals-icons/1F525_Fire_v13_Still 1.svg"
            alt="flamming icon"
            className="w-4 h-4"
            aria-hidden="true"
          />
          <p className="text-xs">{product.itemsLeft} Left</p>
        </div>
      </div>

      <Button
        variant="outline"
        className="py-2 px-3 grid gap-1 rounded-md text-sm font-regular hover:cursor-pointer"
      >
        Add to Cart
      </Button>
    </>
  );
}

function CountdownContent({ product }: { product: Product }) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-2">
      <p className="text-sm font-medium">{product.name}</p>

      <FlipClock size="sm" variant="secondary" />

      <Button className="py-2 px-3 grid gap-1 rounded-md text-sm font-regular hover:cursor-pointer">
        Shop Now
      </Button>
    </div>
  );
}

export function ProductCard({
  variant = "default",
  product,
}: ProductCardProps) {
  const price = EditNum(product.price);
  const ratio = GetRatio(variant);

  return (
    <Card className="mx-auto w-full p-0 hover:ring-2 hover:ring-ring hover:ring-offset-2 hover:shadow-md hover:cursor-pointer transition-all duration-200 ease-in-out">
      <CardContent
        className={`
          px-0 pt-0 pb-3 rounded-xl overflow-hidden
          ${variant === "horizontal" ? "flex gap-3 items-center" : "flex flex-col gap-4"}
        `}
      >
        {/* IMAGE */}
        {variant === "horizontal" ? (
          <div className="w-32 shrink-0">
            <CardImage product={product} ratio={ratio} />
          </div>
        ) : (
          <CardImage product={product} ratio={ratio} />
        )}

        {/* CONTENT */}
        <div
          className={`
            px-3 flex flex-col gap-1
            ${
              variant === "centered" || variant === "countdown"
                ? "items-center text-center"
                : ""
            }
          `}
        >
          {variant === "countdown" ? (
            <CountdownContent product={product} />
          ) : (
            <DefaultContent product={product} price={price} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
