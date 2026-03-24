import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/lib/type";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { EditNum } from "@/lib/utils";

type hotDealsProp = {
  product: Product;
};

export function HotDealsCard({ product }: hotDealsProp) {
  const price: string = EditNum(product.price);

  return (
    <Card className="mx-auto w-full p-0 border hover:ring-2 hover:ring-offset-2 hover:ring-ring hover:shadow-md hover:cursor-pointer transition-all duration-200 ease-in-out">
      <CardContent className="px-0 pt-0 pb-3 flex flex-col justify-between gap-4 rounded-xl overflow-hidden">
        <div className="relative">
          <AspectRatio ratio={1 / 1} >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="overflow-hidden"
            />
          </AspectRatio>
          <Button
            variant="outline"
            size="icon-sm"
            className="bg-background/50 border-0 h-8 w-8 absolute top-2 right-2 rounded-full hover:cursor-pointer hover:bg-background/50"
            aria-label={`Save ${product.name}`}
          >
            <Heart aria-hidden="true" />
          </Button>
        </div>

        <div className="px-3 flex flex-col gap-1">
          <div>
            <p className="text-xs font-medium truncate">{product.name}</p>
            <p className="text-primary">
              <span className="text-xs font-normal">Kshs.</span>
              <span className="text-xs font-medium">{price}</span>
            </p>
          </div>

          <div className="w-full flex items-center gap-1">
            <Progress value={product.progress} className="flex-1 h-1 p-0" />

            <div className="flex items-center gap-1 shrink-0">
              <img
                src="/hot-deals-icons/1F525_Fire_v13_Still 1.svg"
                alt="flamming icon"
                className="w-4 h-4"
                aria-hidden="true"
              />
              <p className="text-xs font-normal whitespace-nowrap leading-none m-0">
                {product.itemsLeft} Left
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            className="py-2 px-3 grid gap-1 rounded-md text-sm font-regular"
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
