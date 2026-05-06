import { ProductCard } from "@/components/product-card/product-card";
import { PaginationLinks } from "@/components/pagination/pagination";
import { GetProductItems } from "@/lib/product-items";

interface CatalogCardProps {
  query?: string;
}

export function CatalogCard({ query }: CatalogCardProps) {
  const allProducts = GetProductItems();

  const products = query
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.subcategory?.toLowerCase().includes(query.toLowerCase()),
      )
    : allProducts;

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
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(160px,1fr))] items-start">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              variant="catalog"
              product={p}
              className="h-full"
            />
          ))}
        </div>
      )}
      <PaginationLinks />
    </main>
  );
}
