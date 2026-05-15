"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { vouchers } from "@/lib/voucher";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Voucher = (typeof vouchers)[number];

type VoucherDropdownMenuProps = {
  selectedVoucherId?: string;
  onSelectVoucher?: (voucher: Voucher) => void;
};

export function VoucherDropdownMenu({
  selectedVoucherId,
  onSelectVoucher,
}: VoucherDropdownMenuProps = {}) {
  const [internalSelectedVoucherId, setInternalSelectedVoucherId] =
    React.useState("");
  const selectedVoucher = selectedVoucherId ?? internalSelectedVoucherId;

  const handleVoucherChange = (voucherId: string) => {
    setInternalSelectedVoucherId(voucherId);

    const voucher = vouchers.find(({ id }) => id === voucherId);

    if (voucher) {
      onSelectVoucher?.(voucher);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" className="h-full rounded-none px-5">
          Select
          <ChevronDown className="size-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-72 max-h-110 rounded-xl border p-3 scrollbar-hide">
        <DropdownMenuRadioGroup
          value={selectedVoucher}
          onValueChange={handleVoucherChange}
          className="grid gap-2"
        >
          {vouchers.map((voucher) => (
            <DropdownMenuRadioItem
              key={voucher.id}
              value={voucher.id}
              className={cn(
                "group rounded-lg py-4 pr-4 pl-12 transition-colors",
                "focus:bg-muted",
                "data-[state=checked]:bg-primary/5",
                "data-[state=checked]:text-primary",
                "[&>span:first-child]:left-4",
                "[&>span:first-child]:size-5",
                "[&>span:first-child]:rounded-full",
                "[&>span:first-child]:border",
                "[&>span:first-child]:border-border",
                "[&>span:first-child]:text-transparent",
                "[&>span:first-child_svg]:size-2.5",
                "data-[state=checked]:[&>span:first-child]:border-primary",
                "data-[state=checked]:[&>span:first-child]:bg-primary",
                "data-[state=checked]:[&>span:first-child]:text-primary-foreground",
              )}
            >
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{voucher.title}</span>

                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground group-data-[state=checked]:text-primary">
                  <span className="text-current">{voucher.code}</span>
                  <span>{voucher.expiry}</span>
                </div>
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
