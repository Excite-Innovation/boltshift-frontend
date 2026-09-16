import { SectionTitle } from "@/components/section-title";
import { CatalogCard } from "@/components/catalog/catalog";
import { FilterSidebar } from "@/components/catalog/filters";
import { BreadcrumbComponent } from "@/components/breadcrumb/breadcrumb";
import { formatCategoryName, type CatalogFilterParams } from "@/lib/catalog";
import { SearchResultsHeader } from "@/components/catalog/search-results-header";
import { fetchSearchedProducts } from "@/lib/products/search-products";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<CatalogFilterParams>;
}) {
  const { category } = await params;
  const filters = await searchParams;
  const query = filters.q?.trim() ?? "";

  const title = formatCategoryName(category);
  const icon = "/popular-categories-icons/Shopping-bags.svg";
  const alt = "Shopping bags icon";

  const items = [
    { label: "Catalog", href: "/catalog" },
    { label: formatCategoryName(category) },
  ];

  const products = await fetchSearchedProducts(filters);

  // Keep the route's category scope after the search API has applied filters.
  const categoryProducts = products.filter(
    (p) => p.category === category,
  );
  const filteredCount = categoryProducts.length;

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
        <CatalogCard products={categoryProducts} productsAreFiltered />
      </div>
    </>
  );
}
