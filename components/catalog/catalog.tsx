import { ProductCard } from "@/components/product-card/product-card";
import { PaginationLinks } from "@/components/pagination/pagination";
import { GetProductItems } from "@/lib/product-items";
import { filterCatalogProducts, type CatalogFilterParams } from "@/lib/catalog";

import type { Product } from "@/types/type";

interface CatalogCardProps {
  filters?: CatalogFilterParams;
  /** Optional pre-filtered product list. Falls back to all products when omitted. */
  products?: Product[];
}

export function CatalogCard({
  filters = {},
  products: productsProp,
}: CatalogCardProps) {
  const products = filterCatalogProducts(productsProp ?? GetProductItems(), filters);

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
        <div className="grid grid-cols-2 justify-start gap-4 sm:grid-cols-[repeat(auto-fit,minmax(min(100%,12rem),12rem))] items-start">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              variant="catalog"
              product={p}
              className="h-full w-full"
            />
          ))}
        </div>
      )}
      <PaginationLinks />
    </main>
  );
}
