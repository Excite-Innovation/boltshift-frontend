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
        subcategories: [
          { title: "Car Accessories", slug: "car-accessories" },
          { title: "Car Care & Cleaning", slug: "car-care" },
          { title: "Interior Parts", slug: "interior-parts" },
        ],
      },
      {
        title: "Baby",
        slug: "baby",
        subcategories: [
          { title: "Diapers & Wipes", slug: "diapers-wipes" },
          { title: "Baby Clothing", slug: "baby-clothing" },
          { title: "Feeding Essentials", slug: "feeding-essentials" },
        ],
      },
      {
        title: "Beauty And Personal Care",
        slug: "beauty",
        subcategories: [
          { title: "Skincare", slug: "skincare" },
          { title: "Hair Care", slug: "hair-care" },
          { title: "Makeup", slug: "makeup" },
        ],
      },
      {
        title: "Men's Fashion",
        slug: "mens-fashion",
        subcategories: [
          { title: "T-Shirts & Shirts", slug: "mens-shirts" },
          { title: "Trousers & Jeans", slug: "mens-bottoms" },
          { title: "Shoes & Sneakers", slug: "mens-shoes" },
        ],
      },
      {
        title: "Women's Fashion",
        slug: "womens-fashion",
        subcategories: [
          { title: "Dresses", slug: "womens-dresses" },
          { title: "Tops & Blouses", slug: "womens-tops" },
          { title: "Shoes & Heels", slug: "womens-shoes" },
        ],
      },
      {
        title: "Electronics",
        slug: "electronics",
        subcategories: [
          { title: "Smartphones", slug: "smartphones" },
          { title: "Laptops & Computers", slug: "laptops-computers" },
          { title: "Audio Devices", slug: "audio-devices" },
        ],
      },
      {
        title: "Pet Supplies",
        slug: "pet-supplies",
        subcategories: [
          { title: "Dog Food", slug: "dog-food" },
          { title: "Cat Accessories", slug: "cat-accessories" },
          { title: "Pet Toys", slug: "pet-toys" },
        ],
      },
      {
        title: "Health",
        slug: "health",
        subcategories: [
          { title: "Vitamins & Supplements", slug: "vitamins-supplements" },
          { title: "First Aid", slug: "first-aid" },
          { title: "Medical Devices", slug: "medical-devices" },
        ],
      },
      {
        title: "Home & Kitchen",
        slug: "home-living",
        subcategories: [
          { title: "Cookware", slug: "cookware" },
          { title: "Furniture", slug: "furniture" },
          { title: "Home Storage", slug: "home-storage" },
        ],
      },
      {
        title: "Luggage",
        slug: "luggage",
        subcategories: [
          { title: "Travel Backpacks", slug: "travel-backpacks" },
          { title: "Suitcases", slug: "suitcases" },
          { title: "Travel Accessories", slug: "travel-accessories" },
        ],
      },
      {
        title: "Accessories",
        slug: "accessories",
        subcategories: [
          { title: "Watches", slug: "watches" },
          { title: "Jewellery", slug: "jewellery" },
          { title: "Sunglasses", slug: "sunglasses" },
        ],
      }
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
