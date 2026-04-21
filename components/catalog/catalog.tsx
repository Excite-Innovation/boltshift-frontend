import { ProductCard } from "@/components/product-card/product-card";
import { PaginationLinks } from "@/components/pagination/pagination";
import { GetProductItems } from "@/lib/product-items";

export function CatalogCard() {
  const products = GetProductItems();

  return (
    <main className="flex flex-col gap-2">
      <div className="p-0 grid grid-cols-2 gap-4 sm:grid-cols-3 md:p-4 md:grid-cols-4 lg:grid-cols-6">
        {products.map((p) => (
          <ProductCard key={p.id} variant="catalog" product={p} className="shrink-0" />
        ))}
      </div>
      <PaginationLinks />
    </main>
  );
}
