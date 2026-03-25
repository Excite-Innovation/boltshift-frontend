import { ProductCard } from "@/components/product-card/product-card";
import { GetProductItems } from "@/lib/product-items";
import { SectionTitle } from "@/components/section-title";

export function FeaturedProducts() {
  const products = GetProductItems();
  const icon = "/section-title-icons/Clipboard.svg";
  const title = "Featured Products";
  const alt = "Clipboard icon";

  return (
    <div className="w-full py-12 flex flex-col gap-10">
      <SectionTitle
        alt={alt}
        icon={icon}
        title={title}
        className="justify-start"
      />

      <div className="grid grid-flow-row grid-cols-8 gap-4">
        <ProductCard
          key={products[0].id}
          variant="countdown"
          product={products[0]}
          className="col-start-1 col-end-3"
        />
        <ProductCard
          key={products[1].id}
          variant="countdown"
          product={products[1]}
          className="col-start-3 col-end-5"
        />

        <div className="col-span-4 grid grid-cols-subgrid gap-4">
          {products.slice(2, 6).map((p) => (
            <ProductCard key={p.id} variant="default" product={p} />
          ))}

          <div className="col-span-2 row-span-1 grid grid-cols-subgrid">
            {products.slice(6, 8).map((p) => (
              <ProductCard key={p.id} variant="wide" product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
