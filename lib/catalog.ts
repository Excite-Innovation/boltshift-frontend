import type { Product } from "@/types/type";

/**
 * Filters a product list by a search query, matching against the
 * product name, category, and subcategory (case-insensitive).
 *
 * Returns the full list unchanged when no query is provided.
 */
export function filterProducts(products: Product[], query?: string): Product[] {
  if (!query?.trim()) return products;

  const q = query.trim().toLowerCase();

  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subcategory?.toLowerCase().includes(q),
  );
}
