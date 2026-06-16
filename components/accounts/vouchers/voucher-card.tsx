"use client";

import Image from "next/image";
import { MoreVertical } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface VoucherCardProps {
  imageSrc: string;
  imageAlt?: string;
  code: string;
  discount: string;
  minimumSpend: number;
  expiryDate: string;
}

export function VoucherCard({
  imageSrc,
  imageAlt = "Voucher image",
  code,
  discount,
  minimumSpend,
  expiryDate,
}: VoucherCardProps) {
  return (
    <Card className="w-full flex flex-row overflow-hidden rounded-xl p-0 border sm:w-84">
      {/* Left section */}
      <div className="flex w-32 items-center justify-center py-8 border-r border-dashed">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={48}
          height={48}
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="relative flex flex-1 items-start justify-between py-5 gap-2">
        <div className="grid gap-1">
          <p className="text-xs">{code}</p>

          <h3 className="text-base font-semibold line-clamp-1">{discount}</h3>

          <p className="text-xs text-muted-foreground">
            Minimum Spend Kshs. {minimumSpend.toLocaleString()}
          </p>

          <p className="text-xs text-muted-foreground">
            Expiry Date: {expiryDate}
          </p>
        </div>

        <Button variant="ghost" size="icon" className="absolute right-0 top-1 z-10">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </Card>
  );
}
