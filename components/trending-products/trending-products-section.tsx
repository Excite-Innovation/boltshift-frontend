import { SectionTitle } from "@/components/section-title";
import { TrendingProductsCard } from "@/components/trending-products/trending-products-card";

export function TrendingProductsSection() {
    const title = "Trending Products"
    const icon = "/section-title-icons/Chart_increasing.svg"
    const alt = "Raising chart icon"

    return (
        <div className="py-12 flex flex-col gap-10">
            <SectionTitle title={title} icon={icon} alt={alt} />
            <TrendingProductsCard />
        </div>
    )
}
