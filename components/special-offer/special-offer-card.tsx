"use client";

import Image from "next/image";
import { useState } from "react";
import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Rating, RatingItem } from "@/components/ui/rating";
import { ColorSwatchSelector } from "@/components/ui/color-swatch-selector";
import { LabelSelector } from "@/components/ui/label-selector";
import { GetProductItems } from "@/lib/product-items";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn, EditNum } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SpecialOfferCard() {
  const productItems = GetProductItems();

  const [selectedColor, setSelectedColor] = useState("Red");
  const [selectedStorage, setSelectedStorage] = useState("64GB");
  const [selectedItem, setSelectedItem] = useState(productItems[0]);
  const [quantity, setQuantity] = useState(1);

  const price = selectedItem.price;
  const totalPrice = EditNum(price * quantity);

  const Increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const Decrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <Card className="p-0 border-none shadow-none">
      <div className="flex gap-12">
        {/* Images Left */}
        <div className="basis-1/2 flex gap-4">
          <div className="w-148 aspect-square rounded-xl overflow-hidden relative">
            <AspectRatio ratio={1 / 1}>
              <Image
                src={selectedItem.image}
                alt={selectedItem.name}
                fill
                className="object-cover"
              />
            </AspectRatio>
          </div>

          <div className="p-1 h-148 flex flex-col gap-4 overflow-y-scroll scroll-smooth scrollbar-hide">
            {productItems.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelectedItem(p)}
                className={cn(
                  "h-20 w-20 rounded-xl relative cursor-pointer transition",
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
                    className="object-cover rounded-xl"
                  />
                </AspectRatio>
              </div>
            ))}
          </div>
        </div>

        {/* Content Right */}
        <div className="h-148 grid gap-3">
          <CardHeader className="px-0 w-93 gap-3">
            <div className="flex gap-2">
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
              <CardTitle className="text-2xl font-semibold p-0 line-clamp-3">
                {selectedItem.name}
              </CardTitle>
              <div className="flex gap-2">
                <Rating value={4} className="text-[#F79009] gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <RatingItem key={i}>
                      <Star size={20} />
                    </RatingItem>
                  ))}
                </Rating>
                <p className="text-sm font-normal text-muted-foreground">
                  (123.46k reviews)
                </p>
              </div>

              <CardDescription className="text-sm line-clamp-3">
                Discover the essence of African craftsmanship with our elegant
                dress, meticulously designed in Voi town, Kenya. Embracing
                vibrant local culture and artistry, each dress is crafted with
                care, blending traditional motifs with contemporary flair.
                Perfect for any occasion, this dress embodies the rich heritage
                and craftsmanship of Kenya, offering both style and cultural
                significance. Dress up with a piece that celebrates authenticity
                and beauty from Voi town to the world.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="px-0 grid gap-3">
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
              />
            </div>

            {/* Storage */}
            <div className="grid gap-2">
              <p className="text-lg font-medium flex items-center gap-0.5">
                <span>Storage</span>
                <span>:</span>
                <span>{selectedStorage}</span>
              </p>
              <StorageSize
                value={selectedStorage}
                onChange={setSelectedStorage}
              />
            </div>

            <p className="text-xl flex gap-1">
              Ksh.<span className="font-semibold">{totalPrice}</span>
            </p>

            <div className="grid gap-2">
              <div className="w-full flex gap-2">
                <ButtonGroup aria-label="Media controls" className="h-fit flex justify-evenly">
                  <Button
                    onClick={Decrement}
                    variant="outline"
                    size="icon"
                    className="grow border-r-0"
                  >
                    <Minus />
                  </Button>
                  <div className="min-w-16 px-4 flex items-center justify-center text-sm font-medium border-y">
                    {quantity}
                  </div>
                  <Button
                    onClick={Increment}
                    variant="outline"
                    size="icon"
                    className="grow"
                  >
                    <Plus />
                  </Button>
                </ButtonGroup>
                <Button
                  variant="outline"
                  className="grow font-semibold text-base"
                >
                  <ShoppingCart className="text-muted-foreground" /> Add to Cart
                </Button>
              </div>
              <Button className="w-full font-semibold text-base py-3">
                Buy Now
              </Button>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

type SelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

function ColorSelector({ value, onChange }: SelectorProps) {
  return (
    <ColorSwatchSelector.Root
      value={value}
      onValueChange={onChange}
      className="bg-background p-0"
    >
      <ColorSwatchSelector.Content>
        <ColorSwatchSelector.Item value="Red" />
        <ColorSwatchSelector.Item value="Orange" />
        <ColorSwatchSelector.Item value="Green" />
        <ColorSwatchSelector.Item value="Blue" />
        <ColorSwatchSelector.Item value="Purple" />
      </ColorSwatchSelector.Content>
    </ColorSwatchSelector.Root>
  );
}

function StorageSize({ value, onChange }: SelectorProps) {
  return (
    <LabelSelector.Root
      value={value}
      onValueChange={onChange}
      className="bg-background p-0 w-93"
    >
      <LabelSelector.Content className="flex flex-wrap gap-2">
        <LabelSelector.Item value="64GB" size="sm" />
        <LabelSelector.Item value="128GB" size="sm" />
        <LabelSelector.Item value="256GB" size="sm" />
        <LabelSelector.Item value="512GB" size="sm" />
        <LabelSelector.Item value="1TB" size="sm" />
        <LabelSelector.Item value="2TB" size="sm" />
        <LabelSelector.Item value="4TB" size="sm" />
      </LabelSelector.Content>
    </LabelSelector.Root>
  );
}
