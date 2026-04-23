import { SectionTitle } from "@/components/section-title";
import { CategoryItems } from "@/lib/products-categories";
import { CategoryCard } from "@/components/category-section/category-card";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function ProductCategory() {
  const icon = "/icon-illustration/ShoppingBags.svg";
  const title = "Popular Categories";
  const alt = "Shopping bags icon";

  return (
    <div className="w-full py-12 flex flex-col gap-10">
      <SectionTitle
        alt={alt}
        icon={icon}
        title={title}
        className="justify-start"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {CategoryItems.map((item, index) => {
          const isLast = index === CategoryItems.length - 1;
          const slug = item.name.toLowerCase().replace(/\s+/g, "-");

          return (
            <Link
              key={item.id}
              href={isLast ? "/catalog" : `/catalog/${slug}`}
            >
              <div
                className={cn(
                  "block",
                  isLast && "ring-4 ring-muted rounded-xl"
                )}
              >
                <CategoryCard categoryItem={item} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}