import { Navbar, NavbarMobile } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer-section";
import { BreadcrumbComponent } from "@/components/breadcrumb/breadcrumb";
import { SectionTitle } from "@/components/section-title";
import { CatalogCard } from "@/components/catalog/catalog";
import { FilterSidebar } from "@/components/catalog/filters";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
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

const items = [{ label: "Catalog" }];

export default function Catalog() {
  const title = "Catalog";
  const icon = "/popular-categories-icons/Shopping-bags.svg";
  const alt = "Shopping bags icon";

  return (
    <div>
      <div>
        <div className="hidden md:block">
          <Navbar />
        </div>
        <div className="block md:hidden">
          <NavbarMobile />
        </div>
      </div>

      <BreadcrumbComponent items={items} />

      {/* Title */}
      <div className="py-4 flex flex-col gap-8 sm:flex-row">
        <SectionTitle
          title={title}
          icon={icon}
          alt={alt}
          className="basis-1/4"
        />
        <p className="flex gap-2.5 items-center basis-3/4">
          <span className="text-xs font-semibold text-muted-foreground md:text-sm lg:text-xl">
            366 results for the search of
          </span>
          <span className="text-xs font-semibold text-primary md:text-sm lg:text-xl">
            luxury contemporary watch
          </span>
        </p>
      </div>

      {/* Page content */}
      <div className="flex items-start">
        <FilterSidebar />
        <CatalogCard />
      </div>

      <Footer />
    </div>
  );
}
