import { Metadata } from "next";

import { CartPageClient } from "@/app/cart/cart-page-client";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),

  title: "Shopping Cart",

  description:
    "Review the products in your Boltshift shopping cart, update quantities, and continue to checkout when you're ready to order.",

  openGraph: {
    url: "/cart",
    title: "Shopping Cart | Boltshift",
    description:
      "Review your selected products, adjust quantities, and get ready to complete your Boltshift order.",
    siteName: "Boltshift",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Boltshift Shopping Cart",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Shopping Cart | Boltshift",
    description:
      "Review your selected products and continue to checkout on Boltshift.",
    images: ["/opengraph-image.png"],
  },
};

export default function CartPage() {
  return <CartPageClient />;
}
