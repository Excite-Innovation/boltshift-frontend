"use client";

import { Skeleton } from "@/components/ui/skeleton";

function WishlistItemSkeleton() {
  return (
    <div className="flex flex-col w-full gap-4 border-b py-4 md:flex-row md:justify-between">
      <div className="flex max-w-140 min-w-84 items-center gap-3">
        <Skeleton className="size-24 shrink-0 rounded-xl" />

        <div className="min-w-0 space-y-2">
          <Skeleton className="h-5 w-44 max-w-full" />
          <div className="flex flex-col gap-2 md:flex-row">
            <Skeleton className="h-6 w-16 rounded-md" />
            <Skeleton className="h-6 w-24 rounded-md" />
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-between md:gap-4 md:max-w-93.75 md:justify-start">
        <Skeleton className="h-10 w-10 rounded-md" />
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-10 w-32 rounded-lg" />
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>
    </div>
  );
}

function CartItemSkeleton() {
  return (
    <div className="flex w-full flex-col gap-10 sm:flex-row">
      <div className="flex w-full flex-col gap-4 border-b border-border/50 py-4 md:flex-row md:justify-between">
        <div className="flex max-w-140 min-w-84 items-center gap-3">
          <Skeleton className="size-24 shrink-0 rounded-xl" />

          <div className="min-w-0 space-y-2">
            <Skeleton className="h-5 w-44 max-w-full" />
            <div className="flex flex-col gap-2 md:flex-row">
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-6 w-24 rounded-md" />
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-between md:max-w-93.75 md:justify-start md:gap-4">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function WishlistLoadingSkeleton() {
  return (
    <div className="grid gap-2">
      <div className="sticky top-24 z-20 hidden border-b border-border/50 bg-background py-1 text-lg font-bold md:flex md:items-center md:justify-between">
        <Skeleton className="h-6 w-16" />

        <div className="flex min-w-93.75 items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>

      <div className="flex flex-col">
        <WishlistItemSkeleton />
        <WishlistItemSkeleton />
        <WishlistItemSkeleton />
      </div>

      <div className="grid w-full justify-items-stretch sm:py-4">
        <Skeleton className="h-12 w-full justify-self-end rounded-lg sm:max-w-88" />
      </div>
    </div>
  );
}

export function CartLoadingSkeleton() {
  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-10">
      <div className="grid w-full min-w-0 flex-[1_1_42rem] gap-2">
        <div className="sticky top-24 z-20 hidden border-b border-border/50 bg-background py-1 text-lg font-bold md:flex md:items-center md:justify-between">
          <Skeleton className="h-6 w-16" />

          <div className="flex min-w-93.75 items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>

        <div className="flex flex-col">
          <CartItemSkeleton />
          <CartItemSkeleton />
          <CartItemSkeleton />
        </div>
      </div>

      <div className="flex flex-[0_1_21rem] justify-center md:sticky md:top-24 md:self-start">
        <div className="w-full max-w-84 rounded-xl border p-6">
          <div className="flex flex-col gap-8">
            <Skeleton className="h-8 w-56" />

            <div className="flex flex-col gap-4">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-11 w-full rounded-lg" />
              <Skeleton className="h-5 w-3/5" />
            </div>

            <div className="border-t border-border pt-8">
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CheckoutSummarySkeleton() {
  return (
    <div className="w-full max-w-84 rounded-xl border p-6">
      <div className="flex flex-col gap-8">
        <Skeleton className="h-8 w-56" />

        <div className="w-72 flex flex-col gap-4">
          <Skeleton className="h-20 w-full rounded-lg" />
          <Skeleton className="h-px w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-11 w-full rounded-lg" />
          <Skeleton className="h-5 w-40" />
        </div>

        <Skeleton className="h-px w-full" />
        <Skeleton className="h-11 w-full rounded-lg" />
      </div>
    </div>
  );
}
