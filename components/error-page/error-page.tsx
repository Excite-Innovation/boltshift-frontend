import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export const errorPageMetadata: Metadata = {
  title: "Error",
  description: "Something went wrong while loading this page.",
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
    href: "/"
  },
  "404": {
    eyebrow: "404 Error",
    title: "Oops! Lost in the Aisles?",
    description:
      "Looks like the page is playing hide and seek. While we find it, why not explore our treasure trove of goodies?",
    cta: "Browse Our Catalog",
    href: "/catalog"
  },
  "500": {
    eyebrow: "500 Error",
    title: "Something broke behind the scenes.",
    description:
      "Our team is already on it. In the meantime, you can head back home and keep shopping from there.",
    cta: "Return Home",
    href: "/"
  },
  offline: {
    eyebrow: "Offline",
    title: "You seem to be offline right now.",
    description:
      "Once your connection is back, we'll reload the page automatically. Until then, you can continue from the homepage.",
    cta: "Go to Homepage",
    href: "/"
  },
};

type ErrorPageViewProps = {
  variant?: ErrorVariant;
};

export function ErrorPageView({ variant = "404" }: ErrorPageViewProps) {
  const copy = errorCopy[variant];

  return (
    <main className="relative flex min-h-screen items-center overflow-hidden  px-4 py-10 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(255,255,255,0))]" />

      <section className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="order-1 flex w-full max-w-[28rem] flex-col gap-8 lg:order-none lg:max-w-none">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              {copy.eyebrow}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {copy.title}
            </h1>
          </div>

          <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            {copy.description}
          </p>

          <div>
            <Button asChild size="lg">
              <Link href={copy.href}>
                <ArrowLeft className="size-4" />
                {copy.cta}
              </Link>
            </Button>
          </div>
        </div>

        <div className="order-2 flex w-full items-center justify-center lg:order-none">
          <div className="relative w-full max-w-[28rem]">
            <Image
              src="/error-page/error_page_img.png"
              alt="A shopper sitting on a bean bag with floating question marks"
              width={469}
              height={482}
              priority
              className="h-auto w-full drop-shadow-[0_24px_48px_rgba(17,24,39,0.16)]"
              sizes="(min-width: 1024px) 28rem, 100vw"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
