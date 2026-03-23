import { CategoryItem } from "@/lib/type";

type categoryItemProps = {
  categoryItem: CategoryItem;
};

export function CategoryCard({ categoryItem }: categoryItemProps) {
  return (
    <div className="h-32 rounded-xl border border-border p-3 flex flex-col justify-center items-center gap-3 hover:ring-2 hover:ring-offset-2 hover:ring-ring hover:shadow-md hover:cursor-pointer transition-all duration-200 ease-in-out">
      <div className="w-12 h-12">
        <img src={categoryItem.image} alt={`${categoryItem.name} icon`} />
      </div>
      <span className="font-medium text-xs text-center">
        {categoryItem.name}
      </span>
    </div>
  );
}
