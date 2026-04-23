import { ProductCard } from "@/components/product-card/product-card";
import { PaginationLinks } from "@/components/pagination/pagination";
import { GetProductItems } from "@/lib/product-items";

export function CatalogCard() {
  const products = GetProductItems();

  return (
    <main className="w-full flex flex-col gap-2 md:p-4">
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(160px,1fr))] items-start">
        {products.map((p) => (
          <ProductCard key={p.id} variant="catalog" product={p} className="w-full" />
        ))}
      </div>
      <PaginationLinks />
    </main>
  );
}
