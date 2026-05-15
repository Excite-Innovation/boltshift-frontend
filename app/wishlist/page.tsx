import { Metadata } from "next";

import { WishlistPageClient } from "@/app/wishlist/wishlist-page-client";

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
  return <WishlistPageClient />;
}
