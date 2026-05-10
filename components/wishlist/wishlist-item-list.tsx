import { Product } from "@/types/type";
import { HorizontalProfile } from "@/components/product-card/product-card";
import { CartQuantityGroup } from "@/components/cart-quantity/cart-quantity-group";

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
  const selectedVariant = product.variants[0];

  return (
    <div className="flex w-full items-center justify-between py-4">
      <HorizontalProfile
        product={product}
        colorName={selectedVariant?.color}
        className="flex-1"
      />

      <CartQuantityGroup
        price={product.price}
        quantity={quantity}
        onRemove={onRemove}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        className="max-w-93.75 shrink-0"
      />
    </div>
  );
}
