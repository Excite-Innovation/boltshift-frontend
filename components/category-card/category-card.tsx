import { CategoryItem } from "@/lib/type";

type categoryItemProps = {
  categoryItem: CategoryItem;
};

export function CategoryCard({ categoryItem }: categoryItemProps) {
  return (
    <div className="w-40 h-32 rounded-xl border p-3 flex flex-col justify-center items-center gap-3">
      <div className="w-12 h-12">
        <img src={categoryItem.image} alt={`${categoryItem.name} icon`} />
      </div>
      <span className="font-medium text-xs text-center">{categoryItem.name}</span>
    </div>
  );
}
