import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

import { DeleteModal } from "@/components/delete-item/delete-modal";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/type";

type CheckoutProductCardProps = {
  product: Product;
  quantity: number;
  onRemove?: () => void;
  onDecrement?: () => void;
  onIncrement?: () => void;
};

const currencyFormatter = new Intl.NumberFormat("en-KE", {
  maximumFractionDigits: 0,
});

function formatCurrency(amount: number) {
  return currencyFormatter.format(Math.max(0, Math.round(amount)));
}

export function CheckoutProductCard({
  product,
  quantity,
  onRemove,
  onDecrement,
  onIncrement,
}: CheckoutProductCardProps) {
  const productImage = product.images[0] ?? "/images/product/shoe.png";
  const productTotal = product.price * quantity;

  return (
    <Card className="w-full max-w-72 p-0 border-0 shadow-none">
      <CardContent className="flex gap-4 px-0 py-3 border-b border-border/5">
        {/* Product Image */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
          <Image
            src={productImage}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-1 flex-col gap-4">
          {/* Title */}
          <h3 className="line-clamp-3 text-xs font-medium leading-5 text-muted-foreground">
            {product.name}
          </h3>

          {/* Actions + Quantity */}
          <div className="flex items-center justify-between gap-6">
            {/* Delete Button */}
            <DeleteModal
              title="Remove Item from Cart"
              description="Are you sure you want to delete this item from cart? This action cannot be undone."
              actionLabel="Remove Item"
              onConfirm={() => onRemove?.()}
              trigger={
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label="Remove item"
                  disabled={!onRemove}
                  className="h-8 w-8 text-muted-foreground hover:bg-transparent hover:text-destructive"
                >
                  <Trash2 className="size-5" />
                </Button>
              }
            />

            {/* Quantity Controls */}
            <ButtonGroup className="rounded-lg border border-border">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                aria-label="Decrease quantity"
                className="h-10 w-10 rounded-xl hover:bg-transparent"
                onClick={onDecrement}
                disabled={quantity <= 1}
              >
                <Minus className="size-4" />
              </Button>

              <ButtonGroupText className="min-w-8 justify-center border-0 bg-transparent px-0 shadow-none">
                {quantity}
              </ButtonGroupText>

              <Button
                type="button"
                size="icon"
                variant="ghost"
                aria-label="Increase quantity"
                className="h-10 w-10 rounded-xl hover:bg-transparent"
                onClick={onIncrement}
              >
                <Plus className="size-4" />
              </Button>
            </ButtonGroup>
          </div>

          {/* Price */}
          <div className="flex justify-end">
            <p className="text-sm font-medium text-foreground">
              <span className="text-muted-foreground">Kshs.</span>{" "}
              {formatCurrency(productTotal)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
