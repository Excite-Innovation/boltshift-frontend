"use client";

import Image from "next/image";

import { ModalWrapper } from "@/components/product-modal/modal-wraper";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/type";

type ProductItemSummaryProps = {
  product: Product;
  label: string;
  colorName: string;
};

export function ProductItemSummary({
  product,
  label,
  colorName,
}: ProductItemSummaryProps) {
  const productImage = product.images[0];

  return (
    <div className="flex max-w-140 items-center gap-3">
      <div className="relative size-24 shrink-0 overflow-hidden rounded-xl border border-border bg-secondary md:size-24">
        <ModalWrapper
          productTitle={product.name}
          vendorName={product.vendor}
          rating={product.ratings}
          productItems={product.images}
        >
          <Image
            src={productImage}
            alt={product.name}
            fill
            sizes="96px"
            className="object-cover hover:cursor-pointer"
          />
        </ModalWrapper>
      </div>

      <div className="min-w-0 space-y-2">
        <p className="line-clamp-2 text-sm font-semibold leading-5 text-foreground">
          {product.name}
        </p>

        <div className="flex flex-col flex-wrap justify-start gap-2 md:flex-row">
          <Badge
            variant="outline"
            className="rounded-md px-2 py-1 text-xs font-normal text-muted-foreground"
          >
            {label}
          </Badge>

          <div className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
            <span
              aria-hidden="true"
              className="size-5 shrink-0 rounded-full bg-amber-500"
            />
            <span className="truncate capitalize">{colorName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
