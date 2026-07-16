import { Skeleton } from "@/components/ui/skeleton";

function CatalogCardSkeleton() {
  return (
    <div className="flex h-full w-full flex-col gap-3 rounded-xl border p-3">
      <Skeleton className="aspect-[4/5] w-full rounded-lg" />

      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/5" />
        <Skeleton className="h-1.5 w-full rounded-full" />

        <div className="flex items-center justify-between gap-2 pt-1">
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
    </div>
  );
}

function CatalogSidebarSkeleton() {
  return (
    <aside className="hidden w-72 shrink-0 border-r pr-4 lg:block">
      <div className="flex flex-col gap-4 py-4">
        <Skeleton className="h-10 w-36" />
        <Skeleton className="h-11 w-full rounded-lg" />

        <div className="space-y-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>

        <Skeleton className="h-14 w-full rounded-lg" />
      </div>
    </aside>
  );
}

export default function CatalogLoading() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-8 sm:flex-row py-4">
        <Skeleton className="hidden h-8 w-56 sm:block" />

        <div className="flex flex-1 flex-col gap-3">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-64 max-w-full" />
          <Skeleton className="h-4 w-48 max-w-full" />
        </div>
      </div>

      <div className="flex items-start gap-4">
        <CatalogSidebarSkeleton />

        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-2 items-start gap-4 sm:grid-cols-[repeat(auto-fit,minmax(min(100%,12rem),12rem))]">
            {Array.from({ length: 8 }).map((_, index) => (
              <CatalogCardSkeleton key={index} />
            ))}
          </div>

          <div className="flex justify-center">
            <div className="flex w-full max-w-md items-center justify-between gap-4">
              <Skeleton className="h-10 w-24 rounded-md" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-10 rounded-md" />
                <Skeleton className="h-10 w-10 rounded-md" />
                <Skeleton className="h-10 w-10 rounded-md" />
              </div>
              <Skeleton className="h-10 w-24 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
