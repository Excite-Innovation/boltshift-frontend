export type FilterItemType = "list" | "checkbox" | "range" | "rating" | "tag";

export type FilterSubItem = {
  title: string;
};

export type FilterItem = {
  title: string;
  type: FilterItemType;
  items?: FilterSubItem[];
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
  {
    title: "Price Range",
    type: "range",
  },
  {
    title: "Rating",
    type: "rating",
  },
  {
    title: "Shipping",
    type: "checkbox",
    items: [
      { title: "Fast" },
      { title: "Saving" },
      { title: "Free" },
    ],
  },
  {
    title: "Popular Tags",
    type: "tag",
    items: [
      { title: "Electronics" },
      { title: "Phones" },
      { title: "Tablets" },
      { title: "T-shirts" },
      { title: "Hoodies" },
      { title: "Watches" },
      { title: "MacBook Pro" },
      { title: "Earrings" },
      { title: "Gold Bracelets" },
      { title: "Keyboard" },
      { title: "Lampshade" },
      { title: "Water Bottle" },
    ],
  }
];
