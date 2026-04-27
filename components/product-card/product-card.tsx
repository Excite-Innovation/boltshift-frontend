import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Product, ProductVariant } from "@/types/type";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import NumberTickerDemo from "@/components/shadcn-space/radix/number-ticker/number-ticker-03";
import { EditNum, GetRatio, cn, FormatNumber } from "@/lib/utils";
import { StartRating } from "@/components/rating/rating";
import Link from "next/link";

type ProductCardProps = {
  variant?: ProductVariant;
  product: Product;
  className?: string;
};

// Shared image block for all card variants, with an optional save button position.
function CardImage({
  product,
  ratio,
  savePosition,
}: {
  product: Product;
  ratio: number;
  savePosition?: string;
}) {
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
        className={cn(
          "bg-background/50 border-0 h-8 w-8 absolute top-2 right-2 rounded-full hover:cursor-pointer hover:bg-background/50",
          savePosition,
        )}
      >
        <Heart />
      </Button>
    </div>
  );
}

// Default layout used in the hot deals grid.
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
            src="/section-title-icons/1F525_Fire_v13_Still 1.svg"
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

// Horizontal layout for compact list-style cards.
function HorizontalDefaultContent({
  product,
  price,
}: {
  product: Product;
  price: string;
}) {
  return (
    <>
      <div className="flex flex-col gap-1 flex-1">
        <p className="text-xs font-medium line-clamp-2">{product.name}</p>

        <p className="text-primary">
          <span className="text-xs">Kshs.</span>
          <span className="text-xs font-medium">{price}</span>
        </p>
      </div>

      <Button
        variant="outline"
        className="w-full py-2 px-3 rounded-md text-sm font-semibold hover:cursor-pointer"
      >
        Add to Cart
      </Button>
    </>
  );
}

// Promo card layout with a live countdown/ticker element.
function CountdownContent({
  product,
  price,
}: {
  product: Product;
  price: string;
}) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-normal truncate">{product.name}</p>
        <p className="text-primary">
          <span className="text-xl">Kshs.</span>
          <span className="text-xl font-semibold">{price}</span>
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <NumberTickerDemo />
        <Button className="w-full py-2 px-3 grid gap-1 rounded-md text-sm font-regular hover:cursor-pointer">
          Add to Cart
        </Button>
      </div>
    </>
  );
}

// Center-aligned layout for spotlight/featured cards.
function CenteredContent({
  product,
  price,
}: {
  product: Product;
  price: string;
}) {
  return (
    <>
      <div className="grid gap-1">
        <p className="text-sm font-normal line-clamp-2 min-h-10">{product.name}</p>
        <p className="text-primary">
          <span className="text-xl">Kshs.</span>
          <span className="text-xl font-semibold">{price}</span>
        </p>
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

// Catalog-specific content: price + rating summary + formatted review count.
function CatalogContent({
  product,
  price,
  ratings,
}: {
  product: Product;
  price: string;
  ratings: number;
}) {
  const reviews = FormatNumber(product.reviews);

  return (
    <>
      <div>
        <p className="text-xs font-medium line-clamp-2 min-h-8">{product.name}</p>
        <p className="text-primary">
          <span className="text-xs">Kshs.</span>
          <span className="text-xs font-medium">{price}</span>
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <StartRating value={ratings} readonly />
        <p className="text-xs text-muted-foreground">({reviews} reviews)</p>
      </div>
    </>
  );
}

// OVERALL CARD COMPONENT WITH THE IMAGE AND CONTENT COMBINED
export function ProductCard({
  variant = "default",
  product,
  className,
}: ProductCardProps) {
  // Format display-only values once so child sections stay presentation-focused.
  const price = EditNum(product.price);
  const ratio = GetRatio(variant);

  return (
    <Link
      href={`/catalog/${product.category}/${product.subcategory}/${product.id}`}
    >
      <Card
        className={cn(
          "mx-auto w-full p-0 hover:ring-2 hover:ring-ring hover:ring-offset-2 hover:shadow-md hover:cursor-pointer transition-all duration-200 ease-in-out shadow-none",
          className,
        )}
      >
        <CardContent
          className={`
          px-0 pt-0 pb-3 rounded-xl overflow-hidden flex grow
          ${variant === "horizontal" ? "pb-0 items-center" : "flex-col gap-4"}
        `}
        >
          {/* Switch image container sizing only for horizontal cards. */}
          {variant === "horizontal" ? (
            <div className="w-32 shrink-0">
              <CardImage
                product={product}
                ratio={ratio}
                savePosition="left-2"
              />
            </div>
          ) : (
            <CardImage product={product} ratio={ratio} />
          )}

          {/* SWITCH CONTENT DEPENDING ON THE CARD TYPE */}
          <div
            className={cn(
              "px-3 flex flex-col",
              variant === "horizontal" && "px-4 items-center gap-3",
              variant === "default" && "gap-1",
              variant === "centered" && "w-72 text-center gap-5",
              variant === "countdown" && "text-center gap-10",
              variant === "catalog" && "text-left gap-2",
            )}
          >
            {/* Render content block based on variant to avoid duplicating card shell markup. */}
            {variant === "countdown" ? (
              <CountdownContent product={product} price={price} />
            ) : variant === "horizontal" ? (
              <HorizontalDefaultContent product={product} price={price} />
            ) : variant === "centered" ? (
              <CenteredContent product={product} price={price} />
            ) : variant === "catalog" ? (
              <CatalogContent
                product={product}
                price={price}
                ratings={product.ratings}
              />
            ) : (
              <DefaultContent product={product} price={price} />
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
