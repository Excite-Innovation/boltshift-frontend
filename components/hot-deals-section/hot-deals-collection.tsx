import { HotDealsCard } from "@/components/hot-deals-section/hot-deals-card";
import { GetHotDeals } from "@/lib/hot-deals";
import { SectionTitle } from "@/components/section-title";

export function HotDealsCollection() {
  const products = GetHotDeals();
  const icon = "/hot-deals-icons/1F525_Fire_v13_Still 1.svg";
  const title = "Hot Deal Today";
  const alt = "Flamming icon";

  return (
    <div className="w-full py-12 flex flex-col gap-10">
      <SectionTitle
        alt={alt}
        icon={icon}
        title={title}
        className="justify-start"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {products.map((product) => (
          <HotDealsCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
