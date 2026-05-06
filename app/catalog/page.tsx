import { SectionTitle } from "@/components/section-title";
import { FilterSidebar } from "@/components/catalog/filters";
import { CatalogCard } from "@/components/catalog/catalog";
import { BreadcrumbComponent } from "@/components/breadcrumb/breadcrumb";
import { GetProductItems } from "@/lib/product-items";

const items = [{ label: "Catalog" }];

interface CatalogPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function Catalog({ searchParams }: CatalogPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const title = "Catalog";
  const icon = "/popular-categories-icons/Shopping-bags.svg";
  const alt = "Shopping bags icon";

  // Count matching products for the header
  const allProducts = GetProductItems();
  const filteredCount = query
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.subcategory?.toLowerCase().includes(query.toLowerCase()),
      ).length
    : allProducts.length;

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
          {/* On mobile: only show the count. On sm+: show full text */}
          <span className="text-xs font-semibold text-muted-foreground md:text-sm lg:text-xl">
            <span>{filteredCount}</span>
            {query ? (
              <>
                <span className="hidden sm:inline"> results for the search of</span>
              </>
            ) : (
              <span className="hidden sm:inline"> products available</span>
            )}
          </span>
          {query && (
            <span className="hidden sm:inline text-xs font-semibold text-primary md:text-sm lg:text-xl">
              {query}
            </span>
          )}
        </p>
      </div>

      <div className="flex items-start">
        {/* shared sidebar */}
        <FilterSidebar />
        <CatalogCard query={query} />
      </div>
    </>
  );
}
