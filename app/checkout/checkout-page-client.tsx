"use client";

import { useMemo } from "react";

import { Navbar, NavbarMobile } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer-section";
import { SectionTitle } from "@/components/section-title";
import { BackButton } from "@/components/back/back";
import { CheckoutProductCard } from "@/components/checkout/checkout-product-spec";
import { GetProductItems } from "@/lib/product-items";
import { getCartItems } from "@/lib/wishlist";
import { PersonalDetailsCard } from "@/components/checkout/personal-details";
import { ShippingDetailsCard } from "@/components/checkout/shipping-details";
import { ShippingMethodCard } from "@/components/checkout/shipping-method-card";
import { Separator } from "@/components/ui/separator";

type CheckoutPageClientProps = {
  itemsParam?: string | null;
};

function parseCheckoutItems(itemsParam: string | null | undefined) {
  if (!itemsParam) {
    return [];
  }

  return itemsParam
    .split(",")
    .map((item) => {
      const [productId, quantity] = item.split(":").map(Number);

      return {
        productId,
        quantity: Math.max(1, quantity || 1),
      };
    })
    .filter(({ productId }) => Number.isFinite(productId));
}

export function CheckoutPageClient({ itemsParam }: CheckoutPageClientProps) {
  const products = useMemo(() => GetProductItems(), []);
  const checkoutItems = useMemo(
    () => getCartItems(parseCheckoutItems(itemsParam), products),
    [itemsParam, products],
  );

  return (
    <div className="w-full">
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
          <BackButton content="Shopping Cart" href="/cart" />
        </div>
        <SectionTitle
          title="Checkout"
          icon="/section-title-icons/Delivery-truck.svg"
          alt="Delivery Truck icon"
          className="py-4"
        />

        <div className="flex flex-wrap gap-10 pb-12">
          <PersonalDetailsCard />
          <Separator />
          <ShippingDetailsCard />
          <Separator />
          <ShippingMethodCard />
        </div>
      </main>

      <Footer />
    </div>
  );
}
