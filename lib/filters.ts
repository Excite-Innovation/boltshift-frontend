export type FilterItemType = "list" | "checkbox" | "range" | "rating" | "tag";

export type FilterSubItem = {
  title: string;
  slug?: string;
  subcategories?: FilterSubItem[];
};

export type FilterItem = {
  title: string;
  type: FilterItemType;
  isActive?: boolean;
  items?: FilterSubItem[];
};

export const FilterItems: FilterItem[] = [
  {
    title: "Categories",
    type: "list",
    isActive: true,
    items: [
      {
        title: "Automotive",
        slug: "automotive",
        subcategories: [],
      },
      {
        title: "Baby",
        slug: "baby",
        subcategories: [],
      },
      {
        title: "Beauty And Personal Care",
        slug: "beauty",
        subcategories: [],
      },

      {
        title: "Men's Fashion",
        slug: "mens-fashion",
        subcategories: [
          { title: "Men's Clothing", slug: "mens-clothing" },
          { title: "Watches", slug: "watches" },
        ],
      },

      {
        title: "Women's Fashion",
        slug: "womens-fashion",
        subcategories: [
          { title: "Women's Clothing", slug: "womens-clothing" },
          { title: "Swimsuit", slug: "swimsuit" },
        ],
      },

      {
        title: "Electronics",
        slug: "electronics",
        subcategories: [
          { title: "Mobile", slug: "mobile" },
          { title: "Laptop", slug: "laptop" },
          { title: "Desktop", slug: "desktop" },
          { title: "Headphones", slug: "headphones" },
        ],
      },

      {
        title: "Pet Supplies",
        slug: "pet-supplies",
        subcategories: [],
      },

      {
        title: "Health & Household",
        slug: "health",
        subcategories: [
          { title: "Health", slug: "health" },
        ],
      },

      {
        title: "Home & Kitchen",
        slug: "home-living",
        subcategories: [
          { title: "Home Appliance", slug: "home-appliance" },
          { title: "Home & Living", slug: "home-living" },
        ],
      },

      {
        title: "Luggage",
        slug: "luggage",
        subcategories: [
          { title: "Backpack", slug: "backpack" },
        ],
      },

      {
        title: "Accessories",
        slug: "accessories",
        subcategories: [
          { title: "Jewelery", slug: "jewelery" },
        ],
      },
    ],
  },
  {
    title: "Brands",
    type: "checkbox",
    isActive: true,
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
    isActive: true,
  },
  {
    title: "Rating",
    type: "rating",
    isActive: true,
  },
  {
    title: "Shipping",
    type: "checkbox",
    isActive: true,
    items: [
      { title: "Fast" },
      { title: "Saving" },
      { title: "Free" },
    ],
  },
  {
    title: "Popular Tags",
    type: "tag",
    isActive: true,
    items: [
      { title: "Electronics" },
      { title: "Phones" },
      { title: "Tablets" },
      { title: "T-shirts" },
      { title: "Hoodies" },
      { title: "Watches" },
      { title: "MacBook Pro" },
      { title: "Ear-rings" },
      { title: "Gold Bracelets" },
      { title: "Keyboard" },
      { title: "Lampshade" },
      { title: "Water Bottle" },
    ],
  }
];
