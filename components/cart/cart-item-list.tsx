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
};

export function CartItem({
  product,
  quantity,
  onRemove,
  onDecrement,
  onIncrement,
}: CartItemProps) {
  const label = "Designer Edition";
  const colorName = product.variants[0]?.color ?? "Default";

  return (
    <div className="flex w-full flex-col gap-10 sm:flex-row">
      <div className="flex w-full flex-col gap-4 border-b border-border/50 py-4 md:flex-row md:justify-between">
        <ProductItemSummary
          product={product}
          label={label}
          colorName={colorName}
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
