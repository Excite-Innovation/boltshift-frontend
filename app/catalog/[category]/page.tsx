import { SectionTitle } from "@/components/section-title";
import { CatalogCard } from "@/components/catalog/catalog";
import { FilterSidebar } from "@/components/catalog/filters";
import { BreadcrumbComponent } from "@/components/breadcrumb/breadcrumb";
import { filterProducts } from "@/lib/catalog";
import { GetProductItems } from "@/lib/product-items";
import { SearchResultsHeader } from "@/components/catalog/search-results-header";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const format = (text: string) =>
    text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const { category } = await params;
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const title = format(category);
  const icon = "/popular-categories-icons/Shopping-bags.svg";
  const alt = "Shopping bags icon";

  const items = [
    { label: "Catalog", href: "/catalog" },
    { label: format(category) },
  ];

  // Filter by category first, then by search query within that category
  const categoryProducts = GetProductItems().filter(
    (p) => p.category === category,
  );
  const filteredCount = filterProducts(categoryProducts, query).length;

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
        <SearchResultsHeader count={filteredCount} query={query} />
      </div>

      <div className="flex items-start">
        {/* shared sidebar */}
        <FilterSidebar />
        <CatalogCard query={query} products={categoryProducts} />
      </div>
    </>
  );
}
