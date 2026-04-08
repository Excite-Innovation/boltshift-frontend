import { Navbar, NavbarMobile } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer-section";
import { BreadcrumbComponent } from "@/components/breadcrumb/breadcrumb";
import { SectionTitle } from "@/components/section-title";

const items = [{ label: "Catalog" }];

export default function Catalog() {
  const title = "Catalog";
  const icon = "/popular-categories-icons/Shopping-bags.svg";
  const alt = "Shopping bags icon";

  return (
    <div>
      <div>
        <div className="hidden md:block">
          <Navbar />
        </div>
        <div className="block md:hidden">
          <NavbarMobile />
        </div>
      </div>

      <BreadcrumbComponent items={items} />
      <div className="py-4 flex flex-col gap-8 sm:flex-row">
        <SectionTitle title={title} icon={icon} alt={alt} className="basis-1/4" />
        <p className="flex gap-2.5 items-center basis-3/4">
          <span className="text-xs font-semibold text-muted-foreground md:text-sm lg:text-xl">366 results for the search of</span>
          <span className="text-xs font-semibold text-primary md:text-sm lg:text-xl">luxury contemporary watch</span>
        </p>
      </div>

      <Footer />
    </div>
  );
}
