import type { CatalogFilterParams } from "@/lib/catalog";
import type { Product } from "@/types/type";
import {
  buildProductsUrl,
  collectApiItems,
  normalizeApiProduct,
  SEARCH_PRODUCTS_PATH,
  type ProductApiItem,
} from "@/lib/products/shared";

const orderingBySort: Record<string, string> = {
  latest: "-created_at",
  oldest: "created_at",
  popular: "-avg_rating",
  price: "price",
  "price-low-to-high": "price",
  "price-high-to-low": "-price",
  "price: low to high": "price",
  "price: high to low": "-price",
  "rating: high to low": "-avg_rating",
  "rating: low to high": "avg_rating",
};

function firstNumericValue(value?: string) {
  const numericValue = value
    ?.split(",")
    .map((item) => item.trim())
    .find((item) => /^\d+$/.test(item));

  return numericValue || "";
}

function minimumRating(value?: string) {
  const ratings = value
    ?.split(",")
    .map(Number)
    .filter(Number.isFinite) ?? [];

  return ratings.length > 0 ? String(Math.min(...ratings)) : "";
}

/** Fetches catalog results using the product search API. */
export async function fetchSearchedProducts(
  filters: CatalogFilterParams = {},
): Promise<Product[]> {
  const params = new URLSearchParams();
  const search = filters.q?.trim();
  const ordering =
    filters.ordering || orderingBySort[filters.sort?.toLowerCase() ?? ""];
  const category = filters.category || firstNumericValue(filters.categories);
  const brand = filters.brand || firstNumericValue(filters.brands);
  const rating = filters.rating || minimumRating(filters.ratings);

  if (search) params.set("search", search);
  if (filters.minPrice) params.set("min_price", filters.minPrice);
  if (filters.maxPrice) params.set("max_price", filters.maxPrice);
  if (ordering) params.set("ordering", ordering);
  if (category) params.set("category", category);
  if (brand) params.set("brand", brand);
  if (rating) params.set("rating", rating);

  const query = params.toString();
  const response = await fetch(
    buildProductsUrl(`${SEARCH_PRODUCTS_PATH}${query ? `?${query}` : ""}`),
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error(`Failed to search products (${response.status})`);
  }

  return collectApiItems(await response.json())
    .map((item) => normalizeApiProduct(item as ProductApiItem))
    .filter((item): item is Product => item !== null);
}
