"use client";

import { useMemo, useState } from "react";
import { ShoppingCart } from "lucide-react";

import { Footer } from "@/components/footer/footer-section";
import { Navbar, NavbarMobile } from "@/components/navigation/navbar";
import { SectionTitle } from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { EmptyWishlist } from "@/components/wishlist/ wishlist-item-card";
import { WishlistItem } from "@/components/wishlist/wishlist-item-list";
import { GetProductItems } from "@/lib/product-items";
import { BackButton } from "@/components/back/back";

type WishlistEntry = {
  productId: number;
  quantity: number;
};

const initialWishlist: WishlistEntry[] = [
  { productId: 5, quantity: 1 },
  { productId: 6, quantity: 1 },
  { productId: 7, quantity: 1 },
  { productId: 8, quantity: 1 },
];

export default function WishlistPage() {
  const products = useMemo(() => GetProductItems(), []);
  const [wishlist, setWishlist] = useState(initialWishlist);

  const wishlistItems = wishlist
    .map((entry) => ({
      ...entry,
      product: products.find((product) => product.id === entry.productId),
    }))
    .filter((entry) => entry.product);

  const updateQuantity = (productId: number, change: number) => {
    setWishlist((current) =>
      current.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item,
      ),
    );
  };

  const removeItem = (productId: number) => {
    setWishlist((current) =>
      current.filter((item) => item.productId !== productId),
    );
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <div className="overflow-y-auto">
      <div>
        <div className="hidden md:block">
          <Navbar />
        </div>
        <div className="block md:hidden">
          <NavbarMobile />
        </div>
      </div>

      <main className="mx-auto w-full">
        <div className="p-4">
          <BackButton />
        </div>

        <SectionTitle
          title="Wishlist"
          icon="/section-title-icons/HeartWithRibbon.svg"
          alt="Heart with ribbon icon"
        />

        <div className="flex flex-col gap-10 pb-12">
          {wishlistItems.length > 0 ? (
            <div className="grid gap-2">
              <div className="hidden border-b py-1 text-lg font-bold md:flex md:justify-between]">
                <span>Item</span>

                <div className="flex gap-4">
                  <span aria-hidden="true" className="w-10 h-10" />
                  <span>Subtotal</span>
                  <span>Quantity</span>
                </div>
              </div>

              <div>
                {wishlistItems.map(({ product, quantity }) => (
                  <WishlistItem
                    key={product!.id}
                    product={product!}
                    quantity={quantity}
                    onRemove={() => removeItem(product!.id)}
                    onDecrement={() => updateQuantity(product!.id, -1)}
                    onIncrement={() => updateQuantity(product!.id, 1)}
                  />
                ))}
              </div>

              <div className="w-full py-4">
                <Button
                  className="justify-self-end px-4.5 py-3 md:w-80"
                  onClick={clearWishlist}
                >
                  <ShoppingCart className="size-4" />
                  Add All To Cart
                </Button>
              </div>
            </div>
          ) : (
            <EmptyWishlist />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
