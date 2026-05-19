import { Metadata } from "next";

import { CheckoutPageClient } from "@/app/checkout/checkout-page-client";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),

  title: "Checkout",

  description:
    "Complete your Boltshift order with delivery and payment details.",

  openGraph: {
    url: "/checkout",
    title: "Checkout | Boltshift",
    description: "Complete your Boltshift order securely.",
    siteName: "Boltshift",
    images: [
      {
        url: "/opengraph-image.png",
        width: 7680,
        height: 4320,
        alt: "Boltshift Checkout",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Checkout | Boltshift",
    description: "Complete your Boltshift order on Boltshift.",
    images: ["/opengraph-image.png"],
  },
};

type CheckoutPageProps = {
  searchParams?: Promise<{
    items?: string | string[];
  }>;
};

export default async function CheckoutPage({
  searchParams,
}: CheckoutPageProps) {
  const params = await searchParams;
  const itemsParam = Array.isArray(params?.items)
    ? params.items[0]
    : params?.items;

  return <CheckoutPageClient itemsParam={itemsParam} />;
}
