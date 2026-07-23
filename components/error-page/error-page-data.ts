import type { Metadata } from "next";

export const errorPageMetadata: Metadata = {
  title: "Error",
  description: "Something went wrong while loading this page.",
};

export const notFoundPageMetadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export type ErrorVariant = "403" | "404" | "500" | "offline";

export type ErrorPageCopy = {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  href: string;
};

export const errorCopy: Record<ErrorVariant, ErrorPageCopy> = {
  "403": {
    eyebrow: "403 Error",
    title: "Access denied to this aisle.",
    description:
      "You might not have permission to view this page. Try heading back to the homepage and continue browsing from there.",
    cta: "Go to Homepage",
    href: "/",
  },
  "404": {
    eyebrow: "404 Error",
    title: "Oops! Lost in the Aisles?",
    description:
      "Looks like the page is playing hide and seek. While we find it, why not explore our treasure trove of goodies?",
    cta: "Browse Our Catalog",
    href: "/catalog",
  },
  "500": {
    eyebrow: "500 Error",
    title: "Something broke behind the scenes.",
    description:
      "Our team is already on it. In the meantime, you can head back home and keep shopping from there.",
    cta: "Return Home",
    href: "/",
  },
  offline: {
    eyebrow: "Offline",
    title: "You seem to be offline right now.",
    description:
      "Once your connection is back, we'll reload the page automatically. Until then, you can continue from the homepage.",
    cta: "Go to Homepage",
    href: "/",
  },
};
