type Vendor = {
    id?: string;
    name: string;
    icon?: string;
    alt: string;
};

type HeroItem = {
    id?: string;
    title: string;
    description: string;
    image: string;
    badge?: string;
    alt: string;
};

type CategoryItem = {
    id?: string;
    image: string;
    name: string;
};

export type Variant = {
  color: string;
  sizes: string[];
};

type Product = {
  id: number;
  image: string;
  name: string;
  price: number;
  progress: number;
  itemsLeft: number;
  ratings: number;
  reviews: number;
  variants: Variant[];
};

// Card variants
type ProductVariant =
    | "default"        // 1:1 
    | "wide"           // 21:10
    | "countdown"      // centered + timer
    | "horizontal"     // image left
    | "centered"      // centered content
    | "catalog";

type Review = {
  id: number;
  name: string;
  avatar?: string,
  date: string;
  rating: number;
  reviewText: string;
  product: {
    name: string;
    image: string;
    price: number;
  };
};

export type { Vendor, HeroItem, CategoryItem, Product, ProductVariant, Review };
