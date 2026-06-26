"use client";

import { CartQuantityGroup } from "@/components/cart-quantity/cart-quantity-group";
import { ProductItemSummary } from "@/components/product-item-summary/product-item-summary";
import { Product } from "@/types/type";

type CartItemProps = {
  product: Product;
  quantity: number;
  onRemove: () => void;
  onDecrement: () => void;
  onIncrement: () => void;
  label?: string;
  colorName?: string;
};

export function CartItem({
  product,
  quantity,
  onRemove,
  onDecrement,
  onIncrement,
  label,
  colorName,
}: CartItemProps) {
  const itemLabel = label ?? product.variants[0]?.sizes[0] ?? "Default";
  const itemColorName = colorName ?? product.variants[0]?.color ?? "Default";

  return (
    <div className="flex w-full flex-col gap-10 sm:flex-row">
      <div className="flex w-full flex-col gap-4 border-b border-border/50 py-4 md:flex-row md:justify-between">
        <ProductItemSummary
          product={product}
          label={itemLabel}
          colorName={itemColorName}
        />

        <CartQuantityGroup
          price={product.price * quantity}
          quantity={quantity}
          onDecrement={onDecrement}
          onIncrement={onIncrement}
          onRemove={onRemove}
          decrementDisabled={quantity <= 1}
        />
      </div>
    </div>
  );
}
