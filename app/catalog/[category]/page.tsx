import { SectionTitle } from "@/components/section-title";
import { CatalogCard } from "@/components/catalog/catalog";
import { FilterSidebar } from "@/components/catalog/filters";
import { BreadcrumbComponent } from "@/components/breadcrumb/breadcrumb";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const format = (text: string) =>
    text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const title = format(params.category);
  const icon = "/popular-categories-icons/Shopping-bags.svg";
  const alt = "Shopping bags icon";

  const items = [
    { label: "Catalog", href: "/catalog" },
    { label: format(params.category) },
  ];

  return (
    <>
      <BreadcrumbComponent items={items} />

      {/* Title */}
      <div className="py-4 flex flex-col gap-8 sm:flex-row">
        <SectionTitle
          title={title}
          icon={icon}
          alt={alt}
          className="basis-1/4"
        />
        <p className="flex gap-2.5 items-center basis-3/4">
          <span className="text-xs font-semibold text-muted-foreground md:text-sm lg:text-xl">
            366 results for the search of
          </span>
          <span className="text-xs font-semibold text-primary md:text-sm lg:text-xl">
            luxury contemporary watch
          </span>
        </p>
      </div>

      <div className="flex items-start">
        {/* shared sidebar */}
        <FilterSidebar />
        <CatalogCard />
      </div>
    </>
  );
}
