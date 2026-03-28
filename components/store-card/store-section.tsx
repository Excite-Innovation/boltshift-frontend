import { SectionTitle } from "@/components/section-title";
import { FeaturedStoreCard } from "@/components/store-card/store-card";

export function FeaturedStoreSection() {
    const title: string = "Featured Store";
    const icon: string = "/section-title-icons/Convenience_store.svg";
    const alt: string = "Store icon";

    return (
        <div className="w-full py-12 grid gap-10">
            <SectionTitle title={title} icon={icon} alt={alt} className="justify-start" />
            <FeaturedStoreCard />
        </div>
    )
}