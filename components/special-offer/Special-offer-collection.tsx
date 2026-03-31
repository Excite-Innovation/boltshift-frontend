import { SectionTitle } from "@/components/section-title";
import { SpecialOfferCard } from "@/components/special-offer/special-offer-card";

export function SpecialOfferSection() {
    const title = "Special Offer";
    const alt = "";
    const icon = "/section-title-icons/Label.svg";

    return (
        <div className="py-12 flex flex-col gap-10">
            <SectionTitle icon={icon} alt={alt} title={title} />

            <SpecialOfferCard />
        </div>
    )
}