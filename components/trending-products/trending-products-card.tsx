import { ProductCard } from "@/components/product-card/product-card";
import { GetProductItems } from "@/lib/product-items";
import { ProductVariant } from "@/lib/type";

export function TrendingProductsCard() {
    const products = GetProductItems();

    return (
        <div className="w-full p-1 flex gap-4 overflow-x-auto scrollbar-hide">
            {products.map((p) => (
                <ProductCard key={p.id} variant="centered" product={p} />
            ))}
        </div>
    );
}