import { SectionTitle } from "@/components/section-title";
import { FilterSidebar } from "@/components/catalog/filters";
import { CatalogCard } from "@/components/catalog/catalog";
import { BreadcrumbComponent } from "@/components/breadcrumb/breadcrumb";
import { GetProductItems } from "@/lib/product-items";
import {
  filterCatalogProducts,
  type CatalogFilterParams,
} from "@/lib/catalog";
import { SearchResultsHeader } from "@/components/catalog/search-results-header";

const items = [{ label: "Catalog" }];

interface CatalogPageProps {
  searchParams: Promise<CatalogFilterParams>;
}

export default async function Catalog({ searchParams }: CatalogPageProps) {
  const filters = await searchParams;
  const query = filters.q?.trim() ?? "";

  const title = "Catalog";
  const icon = "/popular-categories-icons/Shopping-bags.svg";
  const alt = "Shopping bags icon";

  // Count matching products for the header
  const filteredCount = filterCatalogProducts(GetProductItems(), filters).length;

  return (
    <>
      <BreadcrumbComponent items={items} />

      {/* Title */}
      <div className="py-4 flex flex-col gap-8 sm:flex-row">
        <SectionTitle
          title={title}
          icon={icon}
          alt={alt}
          className="basis-1/4 hidden sm:flex"
        />
        <SearchResultsHeader count={filteredCount} query={query} />
      </div>

      <div className="flex items-start">
        {/* shared sidebar */}
        <FilterSidebar />
        <CatalogCard filters={filters} />
      </div>
    </>
  );
}
