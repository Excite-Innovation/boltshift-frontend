"use client";

import Image from "next/image";
import Color from "color";
import { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

import { ModalWrapper } from "@/components/product-modal/modal-wraper";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Product } from "@/types/type";
import { cn } from "@/lib/utils";

type ProductItemSummaryProps = {
  product: Product;
  label?: string;
  colorName?: string;
};

const DEFAULT_SWATCH_COLOR = "#f59e0b";

function getSwatchColor(colorName: string) {
  try {
    return Color(colorName).hexa();
  } catch {
    return DEFAULT_SWATCH_COLOR;
  }
}

function getUniqueValues(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

export function ProductItemSummary({
  product,
  label,
  colorName,
}: ProductItemSummaryProps) {
  const productImage = product.images[0];
  const availableColors = useMemo(
    () => getUniqueValues(product.variants.map((variant) => variant.color)),
    [product.variants],
  );

  const [selectedColor, setSelectedColor] = useState(() => {
    if (colorName && availableColors.includes(colorName)) {
      return colorName;
    }

    return availableColors[0] ?? "Default";
  });

  const selectedVariant =
    product.variants.find((variant) => variant.color === selectedColor) ??
    product.variants[0];

  const availableLabels = useMemo(
    () => getUniqueValues(selectedVariant?.sizes ?? []),
    [selectedVariant],
  );

  const [selectedLabel, setSelectedLabel] = useState(() => {
    if (label && availableLabels.includes(label)) {
      return label;
    }

    return availableLabels[0] ?? "Default";
  });

  useEffect(() => {
    const nextColor =
      colorName && availableColors.includes(colorName)
        ? colorName
        : availableColors[0] ?? "Default";

    setSelectedColor(nextColor);
  }, [availableColors, colorName, product.id]);

  useEffect(() => {
    const nextLabel =
      label && availableLabels.includes(label)
        ? label
        : availableLabels[0] ?? "Default";

    setSelectedLabel(nextLabel);
  }, [availableLabels, label, product.id, selectedColor]);

  const colorDisplay = selectedColor || colorName || "Default";
  const labelDisplay = selectedLabel || label || "Default";

  return (
    <div className="flex max-w-140 min-w-84 items-center gap-3">
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
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="h-auto w-fit rounded-md px-2 py-1 text-xs font-normal text-muted-foreground hover:text-foreground"
              >
                <span>{labelDisplay}</span>
                <ChevronDown className="size-3.5" aria-hidden="true" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-44 p-2" align="start">
              <div className="grid gap-1">
                {availableLabels.length > 0 ? (
                  availableLabels.map((availableLabel) => (
                    <button
                      key={availableLabel}
                      type="button"
                      onClick={() => setSelectedLabel(availableLabel)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                        availableLabel === labelDisplay
                          ? "bg-accent text-accent-foreground"
                          : "",
                      )}
                    >
                      <span className="truncate">{availableLabel}</span>
                      {availableLabel === labelDisplay ? (
                        <Check className="size-4" aria-hidden="true" />
                      ) : null}
                    </button>
                  ))
                ) : (
                  <span className="px-2 py-1.5 text-sm text-muted-foreground">
                    No label options
                  </span>
                )}
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground"
              >
                <span
                  aria-hidden="true"
                  className="size-5 shrink-0 rounded-full border"
                  style={{ backgroundColor: getSwatchColor(colorDisplay) }}
                />
                <span className="truncate capitalize">{colorDisplay}</span>
                <ChevronDown className="size-3.5 shrink-0" aria-hidden="true" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-44 p-2" align="start">
              <div className="grid gap-1">
                {availableColors.length > 0 ? (
                  availableColors.map((availableColor) => (
                    <button
                      key={availableColor}
                      type="button"
                      onClick={() => setSelectedColor(availableColor)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                        availableColor === colorDisplay
                          ? "bg-accent text-accent-foreground"
                          : "",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="size-4 shrink-0 rounded-full border"
                        style={{ backgroundColor: getSwatchColor(availableColor) }}
                      />
                      <span className="truncate capitalize">
                        {availableColor}
                      </span>
                      {availableColor === colorDisplay ? (
                        <Check className="ml-auto size-4" aria-hidden="true" />
                      ) : null}
                    </button>
                  ))
                ) : (
                  <span className="px-2 py-1.5 text-sm text-muted-foreground">
                    No color options
                  </span>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
