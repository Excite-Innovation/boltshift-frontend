import { Product } from "@/types/type";

export type WishlistEntry = {
  productId: number;
  quantity: number;
};

export type CartEntry = WishlistEntry;

export type WishlistAction =
  | {
      type: "add";
      productId: number;
    }
  | {
      type: "increment";
      productId: number;
    }
  | {
      type: "decrement";
      productId: number;
    }
  | {
      type: "remove";
      productId: number;
    }
  | {
      type: "clear";
    };

export const initialWishlist: WishlistEntry[] = [
  { productId: 5, quantity: 1 },
  { productId: 6, quantity: 1 },
  { productId: 7, quantity: 1 },
  { productId: 8, quantity: 1 },
];

export const initialCart: CartEntry[] = [
  { productId: 1, quantity: 1 },
  { productId: 2, quantity: 1 },
];

const WISHLIST_STORAGE_KEY = "boltshift:wishlist";
const CART_STORAGE_KEY = "boltshift:cart";

// TODO: Replace these storage helpers with the shared wishlist state manager once it exists.

// Keep localStorage data narrow before trusting it as app state.
function isWishlistEntry(entry: unknown): entry is WishlistEntry {
  return (
    typeof entry === "object" &&
    entry !== null &&
    "productId" in entry &&
    "quantity" in entry &&
    typeof entry.productId === "number" &&
    typeof entry.quantity === "number"
  );
}

export function addWishlistItem(
  wishlist: WishlistEntry[],
  productId: number,
  quantity = 1,
) {
  const existingItem = wishlist.find((item) => item.productId === productId);

  if (existingItem) {
    return wishlist;
  }

  return [...wishlist, { productId, quantity: Math.max(1, quantity) }];
}

export function readStoredWishlist(fallback = initialWishlist) {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    // Use the seeded wishlist until the shopper has saved their own items.
    const storedWishlist = window.localStorage.getItem(WISHLIST_STORAGE_KEY);

    if (!storedWishlist) {
      return fallback;
    }

    const parsedWishlist: unknown = JSON.parse(storedWishlist);

    if (!Array.isArray(parsedWishlist)) {
      return fallback;
    }

    return parsedWishlist.filter(isWishlistEntry).map((item) => ({
      productId: item.productId,
      quantity: Math.max(1, item.quantity),
    }));
  } catch {
    return fallback;
  }
}

export function writeStoredWishlist(wishlist: WishlistEntry[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
}

export function isProductInStoredWishlist(productId: number) {
  return readStoredWishlist([]).some((item) => item.productId === productId);
}

// Return the next saved state so the button can stay synced with storage.
export function toggleProductInStoredWishlist(productId: number) {
  const wishlist = readStoredWishlist([]);
  const isSaved = wishlist.some((item) => item.productId === productId);
  const nextWishlist = isSaved
    ? removeWishlistItem(wishlist, productId)
    : addWishlistItem(wishlist, productId);

  writeStoredWishlist(nextWishlist);

  return !isSaved;
}

export function getWishlistItems(
  wishlist: WishlistEntry[],
  products: Product[],
) {
  return wishlist.flatMap((entry) => {
    const product = products.find((item) => item.id === entry.productId);

    return product ? [{ ...entry, product }] : [];
  });
}

export function getCartItems(cart: CartEntry[], products: Product[]) {
  return getWishlistItems(cart, products);
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

export function wishlistReducer(
  wishlist: WishlistEntry[],
  action: WishlistAction,
) {
  switch (action.type) {
    case "add":
      return addWishlistItem(wishlist, action.productId);
    case "increment":
      return updateWishlistQuantity(wishlist, action.productId, 1);
    case "decrement":
      return updateWishlistQuantity(wishlist, action.productId, -1);
    case "remove":
      return removeWishlistItem(wishlist, action.productId);
    case "clear":
      return [];
    default:
      return wishlist;
  }
}

export function readStoredCart(fallback = initialCart) {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) {
      return fallback;
    }

    const parsedCart: unknown = JSON.parse(storedCart);

    if (!Array.isArray(parsedCart)) {
      return fallback;
    }

    return parsedCart.filter(isWishlistEntry).map((item) => ({
      productId: item.productId,
      quantity: Math.max(1, item.quantity),
    }));
  } catch {
    return fallback;
  }
}

export function writeStoredCart(cart: CartEntry[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export function cartReducer(cart: CartEntry[], action: WishlistAction) {
  switch (action.type) {
    case "add":
      return addWishlistToCart(cart, [
        { productId: action.productId, quantity: 1 },
      ]);
    case "increment":
      return updateWishlistQuantity(cart, action.productId, 1);
    case "decrement":
      return updateWishlistQuantity(cart, action.productId, -1);
    case "remove":
      return removeWishlistItem(cart, action.productId);
    case "clear":
      return [];
    default:
      return cart;
  }
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
