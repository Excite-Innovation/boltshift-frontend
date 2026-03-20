import { SectionTitle } from "@/components/section-title";
import { CategoryItems } from "@/lib/products-categories";
import { CategoryCard } from "@/components/category-card/category-card";
import { cn } from "@/lib/utils";

export function ProductCategory() {
  const icon = "/icon-illustration/ShoppingBags.svg";
  const title = "Popular Categories";
  const alt = "Shopping bags icon";

  return (
    <div className="bg-card w-full h-290 px-4 py-12 flex flex-col justify-around gap-10">
      <SectionTitle
        alt={alt}
        icon={icon}
        title={title}
        className="justify-start"
      />

      <div className="h-248 grid grid-cols-2 gap-4">
        {CategoryItems.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "block",
              index >= CategoryItems.length - 2 && "sm:block hidden",
            )}
          >
            <CategoryCard categoryItem={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
