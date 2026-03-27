import { Product } from "@/lib/type";
import { GetProductItems } from "@/lib/product-items";
import { ProductCard } from "@/components/product-card/product-card";

export function StoreContent() {
    const products: Product[] = GetProductItems();

    return (
        <div className="grid grid-cols-5 p-1 gap-4 overflow-x-scroll scrollbar-hide">
            {products.map((p) => (
                <ProductCard key={p.id} variant="horizontal" product={p} />
            ))}
            <ProductCard variant="horizontal" product={products[3]} />
            <ProductCard variant="horizontal" product={products[2]} />
        </div>
    )
}