import { Product } from "@/types/type";

export type WishlistEntry = {
  productId: number;
  quantity: number;
};

export type CartEntry = WishlistEntry;

export const initialWishlist: WishlistEntry[] = [
  { productId: 5, quantity: 1 },
  { productId: 6, quantity: 1 },
  { productId: 7, quantity: 1 },
  { productId: 8, quantity: 1 },
];

export function getWishlistItems(
  wishlist: WishlistEntry[],
  products: Product[],
) {
  return wishlist.flatMap((entry) => {
    const product = products.find((item) => item.id === entry.productId);

    return product ? [{ ...entry, product }] : [];
  });
}

export function updateWishlistQuantity(
  wishlist: WishlistEntry[],
  productId: number,
  change: number,
) {
  return wishlist.map((item) =>
    item.productId === productId
      ? { ...item, quantity: Math.max(1, item.quantity + change) }
      : item,
  );
}

export function removeWishlistItem(
  wishlist: WishlistEntry[],
  productId: number,
) {
  return wishlist.filter((item) => item.productId !== productId);
}

export function addWishlistToCart(
  cart: CartEntry[],
  wishlist: WishlistEntry[],
) {
  return wishlist.reduce<CartEntry[]>((nextCart, wishlistItem) => {
    const existingItem = nextCart.find(
      (cartItem) => cartItem.productId === wishlistItem.productId,
    );

    if (!existingItem) {
      return [...nextCart, wishlistItem];
    }

    return nextCart.map((cartItem) =>
      cartItem.productId === wishlistItem.productId
        ? {
            ...cartItem,
            quantity: cartItem.quantity + wishlistItem.quantity,
          }
        : cartItem,
    );
  }, cart);
}
