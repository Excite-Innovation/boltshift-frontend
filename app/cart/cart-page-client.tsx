"use client";

import { useEffect, useMemo, useReducer } from "react";

import { BackButton } from "@/components/back/back";
import { CartItem } from "@/components/cart/cart-item-list";
import { EmptyCart } from "@/components/cart/empty-cart";
import { Footer } from "@/components/footer/footer-section";
import { Navbar, NavbarMobile } from "@/components/navigation/navbar";
import { SectionTitle } from "@/components/section-title";
import {
  cartReducer,
  getCartItems,
  readStoredCart,
  writeStoredCart,
} from "@/lib/wishlist";
import { GetProductItems } from "@/lib/product-items";
import { OrderSummary } from "@/components/cart-quantity/cart-order-summary";

export function CartPageClient() {
  const products = useMemo(() => GetProductItems(), []);
  const [cart, dispatchCart] = useReducer(cartReducer, undefined, () =>
    readStoredCart(),
  );

  useEffect(() => {
    writeStoredCart(cart);
  }, [cart]);

  const cartItems = getCartItems(cart, products);

  return (
    <div className="overflow-x-clip">
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
          title="Shopping Cart"
          icon="/section-title-icons/Shopping-cart.svg"
          alt="Shopping cart icon"
          className="py-4"
        />

        <div className="flex flex-col gap-10 pb-12">
          {cartItems.length > 0 ? (
            <div className="flex w-full flex-wrap items-start justify-center gap-10">
              <div className="grid w-full min-w-0 flex-[1_1_42rem] gap-2">
                <div className="sticky top-24 z-20 hidden border-b border-border/50 bg-background py-1 text-lg font-bold md:flex md:items-center md:justify-between">
                  <span>Item</span>

                  <div className="flex min-w-93.75 items-center gap-4">
                    <span aria-hidden="true" className="h-10 w-10" />
                    <span className="w-24">Subtotal</span>
                    <span className="w-32">Quantity</span>
                  </div>
                </div>

                <div>
                  {cartItems.map(({ product, quantity }) => (
                    <CartItem
                      key={product.id}
                      product={product}
                      quantity={quantity}
                      onRemove={() =>
                        dispatchCart({
                          type: "remove",
                          productId: product.id,
                        })
                      }
                      onDecrement={() =>
                        dispatchCart({
                          type: "decrement",
                          productId: product.id,
                        })
                      }
                      onIncrement={() =>
                        dispatchCart({
                          type: "increment",
                          productId: product.id,
                        })
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Order summary */}
              <div className="flex flex-[0_1_21rem] justify-center md:sticky md:top-24 md:self-start">
                <OrderSummary items={cartItems} />
              </div>
            </div>
          ) : (
            <EmptyCart />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
