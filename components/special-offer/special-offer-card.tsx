"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Rating, RatingItem } from "@/components/ui/rating";
import { ColorSwatchSelector } from "@/components/ui/color-swatch-selector";
import { LabelSelector } from "@/components/ui/label-selector";
import { GetProductItems } from "@/lib/product-items";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { StartRating } from "@/components/rating/rating";
import { cn, EditNum } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

export function SpecialOfferCard() {
  const productItems = GetProductItems();

  const [selectedItem, setSelectedItem] = useState(productItems[0]);
  const [selectedColor, setSelectedColor] = useState(
    productItems[1].variants[0].color,
  );
  const [selectedSize, setSelectedSize] = useState(
    productItems[1].variants[0].sizes[0],
  );
  const [quantity, setQuantity] = useState(1);

  const selectedVariant =
    selectedItem.variants.find((v) => v.color === selectedColor) ||
    selectedItem.variants[0];

  const colors = selectedItem.variants.map((v) => v.color);

  const isStorage = selectedVariant?.sizes.some(
    (s) => s.toLowerCase().includes("gb") || s.toLowerCase().includes("tb"),
  );

  const price = selectedItem.price;
  const totalPrice = EditNum(price * quantity);

  useEffect(() => {
    const firstVariant = selectedItem.variants[0];
    setSelectedColor(firstVariant.color);
    setSelectedSize(firstVariant.sizes[0]);
  }, [selectedItem]);

  useEffect(() => {
    if (!selectedVariant?.sizes.includes(selectedSize)) {
      setSelectedSize(selectedVariant.sizes[0]);
    }
  }, [selectedColor]);

  const Increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const Decrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <Card className="w-full p-0 border-none shadow-none">
      <div className="w-full flex flex-col gap-4 min-[1160px]:flex-row min-[1160px]:gap-12">
        {/* Mobile screen display */}
        <div className="grid gap-4 min-[1160px]:hidden">
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline" className="text-primary border-primary/25">
              50% Discount
            </Badge>
            <Badge variant="outline" className="text-primary border-primary/25">
              New Arrival
            </Badge>
            <Badge variant="outline" className="text-primary border-primary/25">
              Trending
            </Badge>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-1">
              <CardTitle className="text-2xl font-semibold p-0 line-clamp-3">
                {selectedItem.name}
              </CardTitle>

              <div className="flex gap-2">
                <StartRating value={selectedItem.ratings} />

                <p className="text-sm font-normal text-muted-foreground">
                  (123.46k reviews)
                </p>
              </div>
            </div>

            <p className="text-xl flex gap-1">
              Ksh.<span className="font-semibold">{totalPrice}</span>
            </p>
          </div>
        </div>

        {/* Left Images */}
        <div className="w-full h-full flex flex-col gap-4 md:flex-row md:items-stretch">
          <div className="w-full h-full flex-1 rounded-xl overflow-hidden border relative">
            <AspectRatio ratio={1 / 1}>
              <Image
                src={selectedItem.image}
                alt={selectedItem.name}
                fill
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>

          <div
            className="p-1 flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide 
                 md:max-h-157.5 md:flex-col md:overflow-y-auto
                 lg:max-h-221.5 xl:max-h-143.5
              "
          >
            {productItems.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelectedItem(p)}
                className={cn(
                  "h-20 w-20 min-w-20 aspect-square rounded-xl relative cursor-pointer transition",
                  selectedItem.id === p.id
                    ? "ring-2 ring-offset-2 ring-ring"
                    : "",
                )}
              >
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="80px"
                    className="object-cover rounded-xl"
                  />
                </AspectRatio>
              </div>
            ))}
          </div>
        </div>

        {/* Content Right */}
        <div className="w-full">
          <div className="max-w-93 grid gap-3 overflow-hidden">
            <CardHeader className="w-full min-w-0 px-0 gap-3">
              {/* Hide on mobile, show on min-[1160px] */}
              <div className="hidden min-[1160px]:flex gap-2">
                <Badge
                  variant="outline"
                  className="text-primary border-primary/25"
                >
                  50% Discount
                </Badge>
                <Badge
                  variant="outline"
                  className="text-primary border-primary/25"
                >
                  New Arrival
                </Badge>
                <Badge
                  variant="outline"
                  className="text-primary border-primary/25"
                >
                  Trending
                </Badge>
              </div>
              <div className="grid gap-2">
                {/* Hide on mobile, show on min-[1160px] */}
                <div className="hidden min-[1160px]:block">
                  <CardTitle className="text-2xl font-semibold p-0 line-clamp-3">
                    {selectedItem.name}
                  </CardTitle>
                </div>
                {/* Hide on mobile, show on min-[1160px] */}
                <div className="hidden min-[1160px]:flex gap-2">
                  <StartRating value={selectedItem.ratings} />
                  <p className="text-sm font-normal text-muted-foreground">
                    (123.46k reviews)
                  </p>
                </div>
                <CardDescription className="text-sm line-clamp-3">
                  Discover the essence of African craftsmanship with our elegant
                  dress, meticulously designed in Voi town, Kenya. Embracing
                  vibrant local culture and artistry, each dress is crafted with
                  care, blending traditional motifs with contemporary flair.
                  Perfect for any occasion, this dress embodies the rich
                  heritage and craftsmanship of Kenya, offering both style and
                  cultural significance. Dress up with a piece that celebrates
                  authenticity and beauty from Voi town to the world.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="min-w-0 px-0 grid gap-3">
              <p className="text-sm font-semibold">SKU:IPH-RED-256-001</p>

              {/* Color selector */}
              <div className="grid gap-2">
                <p className="text-lg font-medium flex items-center gap-0.5">
                  <span>Color</span>
                  <span>:</span>
                  <span className="font-mono">{selectedColor}</span>
                </p>
                <ColorSelector
                  value={selectedColor}
                  onChange={setSelectedColor}
                  options={colors}
                />
              </div>

              {/* Storage */}
              <div className="grid gap-2">
                <p className="text-lg font-medium flex items-center gap-0.5">
                  <span>{isStorage ? "Storage" : "Size"}</span>
                  <span>:</span>
                  <span>{selectedSize}</span>
                </p>
                <StorageSize
                  value={selectedSize}
                  onChange={setSelectedSize}
                  options={selectedVariant?.sizes || []}
                />
              </div>

              <p className="hidden min-[1160px]:flex text-xl gap-1">
                Ksh.<span className="font-semibold">{totalPrice}</span>
              </p>
            </CardContent>

            <CardFooter className="w-full px-0 grid grid-cols-2 gap-4 sm:max-w-96 min-w-0">
              <ButtonGroup
                aria-label="Media controls"
                className="w-full min-w-0 flex justify-evenly"
              >
                <Button
                  onClick={Decrement}
                  variant="outline"
                  size="icon"
                  className="flex-1 border-r-0"
                >
                  <Minus />
                </Button>

                <div className="flex items-center justify-center text-sm font-medium border-y">
                  {quantity}
                </div>

                <Button
                  onClick={Increment}
                  variant="outline"
                  size="icon"
                  className="flex-1"
                >
                  <Plus />
                </Button>
              </ButtonGroup>

              <Button
                variant="outline"
                className="w-full font-semibold text-base"
              >
                <ShoppingCart className="text-muted-foreground" />
                Add to Cart
              </Button>

              <Button className="w-full col-span-2 font-semibold text-base py-3">
                Buy Now
              </Button>
            </CardFooter>
          </div>
        </div>
      </div>
    </Card>
  );
}

type SelectorProps = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
};

function ColorSelector({ value, onChange, options }: SelectorProps) {
  return (
    <ColorSwatchSelector.Root
      value={value}
      onValueChange={onChange}
      className="bg-background p-0"
    >
      <ColorSwatchSelector.Content>
        {options.map((color) => (
          <ColorSwatchSelector.Item key={color} value={color} />
        ))}
      </ColorSwatchSelector.Content>
    </ColorSwatchSelector.Root>
  );
}

function StorageSize({ value, onChange, options }: SelectorProps) {
  return (
    <LabelSelector.Root
      value={value}
      onValueChange={onChange}
      className="bg-background p-0 w-93"
    >
      <LabelSelector.Content className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <LabelSelector.Item key={opt} value={opt} size="sm" />
        ))}
      </LabelSelector.Content>
    </LabelSelector.Root>
  );
}
