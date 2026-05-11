import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Product } from "@/types/type";
import { EditNum } from "@/lib/utils";

type WishlistItemProps = {
  product: Product;
  quantity: number;
  onRemove?: () => void;
  onDecrement?: () => void;
  onIncrement?: () => void;
};

export function WishlistItem({
  product,
  quantity,
  onRemove,
  onDecrement,
  onIncrement,
}: WishlistItemProps) {
  const label = "Designer Edition";
  const colorName = "Sunset Golden Yellow";

  return (
    <div className="flex flex-col w-full gap-4 border-b py-4 justify-between md:flex-row">
      <div className="flex max-w-140 items-center gap-3">
        <div className="relative size-24 shrink-0 overflow-hidden rounded-md border border-border bg-secondary md:size-24">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 space-y-2">
          <p className="line-clamp-2 text-sm font-semibold leading-5 text-foreground">
            {product.name}
          </p>

          <div className="flex flex-col flex-wrap justify-start gap-2 md:flex-row">
            <Badge
              variant="outline"
              className="rounded-md px-2 py-1 text-xs font-normal text-muted-foreground"
            >
              {label}
            </Badge>

            <div className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
              <span
                aria-hidden="true"
                className="size-5 shrink-0 rounded-full bg-amber-500"
              />
              <span className="truncate capitalize">{colorName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Items price and quantity */}
      <div className="w-full flex items-center gap-4 md:min-w-93.75">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Remove item"
          onClick={onRemove}
          className="justify-self-start text-muted-foreground hover:text-destructive md:justify-self-center"
        >
          <Trash2 className="size-4" />
        </Button>

        <div className="flex items-center gap-1 text-sm md:justify-self-start">
          <span className="text-muted-foreground">Kshs.</span>
          <span className="font-medium">
            {EditNum(product.price * quantity)}
          </span>
        </div>

        <ButtonGroup
          aria-label="Quantity controls"
          className="h-10 w-32 overflow-hidden rounded-lg border bg-background md:justify-self-start"
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Decrease quantity"
            onClick={onDecrement}
            className="h-full flex-1 rounded-none text-muted-foreground"
          >
            <Minus className="size-4" />
          </Button>

          <div className="flex h-full flex-1 items-center justify-center  text-sm font-semibold">
            {quantity}
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Increase quantity"
            onClick={onIncrement}
            className="h-full flex-1 rounded-none text-muted-foreground"
          >
            <Plus className="size-4" />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
