export type FilterItemType = "list" | "checkbox";

export type FilterSubItem = {
  title: string;
};

export type FilterItem = {
  title: string;
  type: FilterItemType;
  items: FilterSubItem[];
};

export const FilterItems: FilterItem[] = [
  {
    title: "Categories",
    type: "list",
    items: [
      { title: "Automotive" },
      { title: "Baby" },
      { title: "Beauty And Personal Care" },
      { title: "Men's Fashion" },
      { title: "Women's Fashion" },
      { title: "Pet Supplies" },
      { title: "Health & Household" },
      { title: "Home & Kitchen" },
      { title: "Luggage" },
    ],
  },
  {
    title: "Brands",
    type: "checkbox",
    items: [
      { title: "3M Company" },
      { title: "Apple Computer, Inc." },
      { title: "Caterpillar Inc." },
      { title: "Coca-Cola Co." },
      { title: "Dell Computer Corporation" },
      { title: "Electronic Arts Inc." },
      { title: "Ford Motor Co" },
      { title: "Gap Inc." },
      { title: "Hershey Foods Corp." },
    ],
  },
];
