import { SectionTitle } from "@/components/section-title";
import { PopularProductsCard } from "@/components/popular-products/popular-products-card";

export function PopularCardSection() {
  const icon = "/section-title-icons/Red heart.svg";
  const title = "Popular Products";
  const alt = "Red heart icon";

  return (
    <div className="w-full py-12 flex flex-col gap-10">
      <SectionTitle icon={icon} title={title} alt={alt} className="justify-start" />

      <PopularProductsCard />
    </div>
  );
}
