import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Home, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Offline",
  description:
    "Boltshift is currently offline. Cached pages and locally saved items are still available.",
};

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(238,34,85,0.12),_transparent_45%),linear-gradient(180deg,_#fff,_#fff6f8)] px-4 py-10">
      <section className="w-full max-w-xl rounded-3xl border border-border/70 bg-background/95 p-8 shadow-2xl backdrop-blur">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-amber-100 p-3 text-amber-700">
            <AlertTriangle className="size-6" aria-hidden="true" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Offline mode
            </p>
            <h1 className="mt-2 font-heading text-3xl text-foreground">
              You’re temporarily offline.
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              You can still browse cached content, revisit your cart, and keep
              shopping items saved on this device. Once your connection is back,
              Boltshift will refresh the cached shell automatically.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/">
                  <Home className="size-4" />
                  Go home
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/cart">
                  <ShoppingBag className="size-4" />
                  Open cart
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
