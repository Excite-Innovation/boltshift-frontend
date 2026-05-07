import { ProductCard } from "@/components/product-card/product-card";
import { PaginationLinks } from "@/components/pagination/pagination";
import { GetProductItems } from "@/lib/product-items";
import { filterProducts } from "@/lib/catalog";

import type { Product } from "@/types/type";

interface CatalogCardProps {
  query?: string;
  /** Optional pre-filtered product list. Falls back to all products when omitted. */
  products?: Product[];
}

export function CatalogCard({ query, products: productsProp }: CatalogCardProps) {
  const products = filterProducts(productsProp ?? GetProductItems(), query);

  return (
    <main className="w-full flex flex-col gap-2 md:p-4">
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
          <p className="text-lg font-semibold">No products found</p>
          <p className="text-sm text-muted-foreground">
            Try a different search term or clear your filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(160px,1fr))] items-start justify-items-start">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              variant="catalog"
              product={p}
              className="h-full max-w-48"
            />
          ))}
        </div>
      )}
      <PaginationLinks />
    </main>
  );
}
