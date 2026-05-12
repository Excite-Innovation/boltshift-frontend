import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { DeleteModal } from "@/components/delete-item/delete-modal";
import { Product } from "@/types/type";
import { EditNum } from "@/lib/utils";
import {
  showSonnerMessage,
  type SonnerMessageProps,
} from "@/components/alert/alert";

type WishlistItemProps = {
  product: Product;
  quantity: number;
  onRemove: () => void;
  onDecrement: () => void;
  onIncrement: () => void;
  onAddToCart: () => void;
};

export function WishlistItem({
  product,
  quantity,
  onRemove,
  onDecrement,
  onIncrement,
  onAddToCart,
}: WishlistItemProps) {
  const label = "Designer Edition";
  const colorName = "Sunset Golden Yellow";

  const title = "Remove Item from Wishlist";
  const description =
    "Are you sure you want to delete this item from wishlist? This action cannot be undone.";
  const actionLabel = "Remove Item";

  // Sonnar message
  const notification: SonnerMessageProps = {
    variant: "success",
    title: "Item Added to Cart",
    description: "Checkout the cart and proceed to complete your order.",
    iconSrc: "/sonnar/Green-Featured-outline.svg",
  };

  const handleConfirm = () => {
    onAddToCart();

    if (notification) {
      showSonnerMessage(notification);
    }
  };

  return (
    <div className="flex flex-col w-full gap-4 border-b py-4 md:flex-row md:justify-between">
      <div className="flex max-w-140 items-center gap-3">
        <div className="relative size-24 shrink-0 overflow-hidden rounded-xl border border-border bg-secondary md:size-24">
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
      <div className="flex w-full items-center justify-between md:gap-4 md:max-w-93.75 md:justify-start">
        <DeleteModal
          title={title}
          description={description}
          actionLabel={actionLabel}
          onConfirm={onRemove}
          trigger={
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Remove item"
              className="justify-self-start text-muted-foreground hover:text-destructive md:justify-self-center"
            >
              <Trash2 className="size-4" />
            </Button>
          }
        />

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
            disabled={quantity <= 1}
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

        <Button
          type="button"
          size="icon"
          aria-label={`Add ${product.name} to cart`}
          onClick={handleConfirm}
          className="rounded-md hover:cursor-pointer"
        >
          <ShoppingCart className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
