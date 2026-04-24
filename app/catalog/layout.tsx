import { Metadata } from "next";
import { Navbar, NavbarMobile } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer-section";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),

  title: "Boltshift Product Catalog",

  description:
    "Browse our catalog of products on Boltshift. Discover electronics, fashion, accessories, and more at great prices.",

  openGraph: {
    url: "/catalog",
    title: "Product Catalog | Boltshift",
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

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden">
      {/* Navbar */}
      <div>
        <div className="hidden md:block">
          <Navbar />
        </div>
        <div className="block md:hidden">
          <NavbarMobile />
        </div>
      </div>

      {children}

      <Footer />
    </div>
  );
}
