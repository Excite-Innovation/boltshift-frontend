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
          <ProductCard
            key={products[2].id}
            variant="default"
            product={products[2]}
            className="col-start-5 col-end-6 row-start-1 row-end-2"
          />
          <ProductCard
            key={products[3].id}
            variant="default"
            product={products[3]}
          />
          <ProductCard
            key={products[4].id}
            variant="default"
            product={products[4]}
          />
          <ProductCard
            key={products[5].id}
            variant="default"
            product={products[5]}
          />
          <div className="col-span-2 grid grid-cols-subgrid">
            <ProductCard
              key={products[6].id}
              variant="wide"
              product={products[6]}
            />
            <ProductCard
              key={products[7].id}
              variant="wide"
              product={products[7]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
