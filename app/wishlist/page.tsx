"use client";

import { Metadata } from "next";
import { useEffect, useMemo, useReducer, useState } from "react";
import { ShoppingCart } from "lucide-react";

import { Footer } from "@/components/footer/footer-section";
import { Navbar, NavbarMobile } from "@/components/navigation/navbar";
import { SectionTitle } from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { EmptyWishlist } from "@/components/wishlist/ wishlist-item-card";
import { WishlistItem } from "@/components/wishlist/wishlist-item-list";
import { GetProductItems } from "@/lib/product-items";
import { BackButton } from "@/components/back/back";
import {
  addWishlistToCart,
  getWishlistItems,
  readStoredWishlist,
  writeStoredWishlist,
  wishlistReducer,
} from "@/lib/wishlist";
import {
  showSonnerMessage,
  type SonnerMessageProps,
} from "@/components/alert/alert";

// Page Metadata
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),

  title: "Wishlist",

  description:
    "Save products you love to your wishlist and revisit them anytime. Keep track of favorite items, compare options, and shop faster when you're ready to buy.",

  openGraph: {
    url: "/wishlist",
    title: "Wishlist | Boltshift",
    description:
      "Explore a wide range of products on Boltshift. Find the best deals across multiple categories.",
    siteName: "Boltshift",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Boltshift Catalog",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Product Catalog | Boltshift",
    description:
      "Browse products across categories on Boltshift and find what you need.",
    images: ["/opengraph-image.png"],
  },
};

export default function WishlistPage() {
  const products = useMemo(() => GetProductItems(), []);
  const [wishlist, dispatchWishlist] = useReducer(
    wishlistReducer,
    undefined,
    () => readStoredWishlist(),
  );
  const [, setCart] = useState<typeof wishlist>([]);

  useEffect(() => {
    writeStoredWishlist(wishlist);
  }, [wishlist]);

  const wishlistItems = getWishlistItems(wishlist, products);

  const addAllToCart = () => {
    setCart((current) => addWishlistToCart(current, wishlist));
    dispatchWishlist({ type: "clear" });
  };

  const addItemToCart = (productId: number, quantity: number) => {
    setCart((current) => addWishlistToCart(current, [{ productId, quantity }]));
    dispatchWishlist({ type: "remove", productId });
  };

  // Sonnar message when all wishlist items are added to cart
  const notification: SonnerMessageProps = {
    variant: "success",
    title: "All Items Added Successfully",
    description: "Checkout the cart and proceed to complete your order.",
    iconSrc: "/sonnar/Green-Featured-outline.svg",
  };

  const handleConfirm = () => {
    addAllToCart();

    if (notification) {
      showSonnerMessage(notification);
    }
  };

  return (
    <div className="overflow-x-hidden overflow-y-auto">
      <div>
        <div className="hidden md:block">
          <Navbar />
        </div>
        <div className="block md:hidden">
          <NavbarMobile showFilterButton={false} />
        </div>
      </div>

      <main className="mx-auto w-full">
        <div className="py-4">
          <BackButton />
        </div>

        <SectionTitle
          title="Wishlist"
          icon="/section-title-icons/HeartWithRibbon.svg"
          alt="Heart with ribbon icon"
          className="py-4"
        />

        <div className="flex flex-col gap-10 pb-12">
          {wishlistItems.length > 0 ? (
            <div className="grid gap-2">
              <div className="hidden border-b py-1 text-lg font-bold md:flex md:justify-between md:items-center">
                <span>Item</span>

                <div className="min-w-93.75 flex gap-4 items-center">
                  <span aria-hidden="true" className="w-10 h-10" />
                  <span className="w-24">Subtotal</span>
                  <span className="w-32">Quantity</span>
                </div>
              </div>

              <div>
                {wishlistItems.map(({ product, quantity }) => (
                  <WishlistItem
                    key={product.id}
                    product={product}
                    quantity={quantity}
                    onRemove={() =>
                      dispatchWishlist({
                        type: "remove",
                        productId: product.id,
                      })
                    }
                    onDecrement={() =>
                      dispatchWishlist({
                        type: "decrement",
                        productId: product.id,
                      })
                    }
                    onIncrement={() =>
                      dispatchWishlist({
                        type: "increment",
                        productId: product.id,
                      })
                    }
                    onAddToCart={() => addItemToCart(product.id, quantity)}
                  />
                ))}
              </div>

              <div className="w-full grid justify-items-stretch sm:py-4">
                <Button
                  className="w-full justify-self-end px-4.5 py-3 sm:max-w-88"
                  onClick={handleConfirm}
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
