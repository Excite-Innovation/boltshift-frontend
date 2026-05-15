"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const vouchers = [
  {
    id: "voucher-1",
    title: "40% off Shopping",
    code: "CO-4321-8765",
    expiry: "Exp:15th Aug,2023",
  },
  {
    id: "voucher-2",
    title: "25% off Electronics",
    code: "EL-9876-1234",
    expiry: "Exp:20th Sep,2023",
  },
]

export function VoucherDropdownMenu() {
  const [selectedVoucher, setSelectedVoucher] =
    React.useState("voucher-1")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          className="h-full rounded-none px-5"
        >
          Select
          <ChevronDown className="size-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-72 rounded-xl border p-3"
      >
        <DropdownMenuRadioGroup
          value={selectedVoucher}
          onValueChange={setSelectedVoucher}
          className="grid gap-2"
        >
          {vouchers.map((voucher) => (
            <DropdownMenuRadioItem
              key={voucher.id}
              value={voucher.id}
              className={cn(
                "rounded-lg p-4 transition-colors flex gap-2",
                "focus:bg-muted",
                "data-[state=checked]:bg-primary/5",
                "data-[state=checked]:text-primary"
              )}
            >
                
              <div className="flex flex-col">
                <span className="text-sm font-semibold">
                  {voucher.title}
                </span>

                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground data-[state=checked]:text-primary">
                  <span className="text-foreground">{voucher.code}</span>
                  <span>{voucher.expiry}</span>
                </div>
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
