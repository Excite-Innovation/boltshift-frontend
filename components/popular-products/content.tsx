import { Product } from "@/lib/type";
import { GetProductItems } from "@/lib/product-items";
import { ProductCard } from "@/components/product-card/product-card";

export function PopularCardContent() {
    const products: Product[] = GetProductItems();

    return (
        <div className="w-full grid grid-flow-col grid-rows-2 gap-4 p-1 overflow-x-auto scroll-smooth scrollbar-hide">
            {products.map((p) => (
                <ProductCard key={p.id} variant="horizontal" product={p} />
            ))}
            <ProductCard variant="horizontal" product={products[3]} />
            <ProductCard variant="horizontal" product={products[2]} />
        </div>
    )
}
