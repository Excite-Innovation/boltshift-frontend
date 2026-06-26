"use client";

import Image from "next/image";

import { Card } from "@/components/ui/card";
import { VoucherActionMenu } from "@/components/accounts/vouchers/voucher-action-menu";

interface VoucherCardProps {
  id: string;
  imageSrc: string;
  imageAlt?: string;
  code: string;
  discount: string;
  minimumSpend: number;
  expiryDate: string;
  onCopyCode?: (code: string) => void;
  onShare?: (code: string) => void;
  onDelete?: (id: string) => void;
}

export function VoucherCard({
  id,
  imageSrc,
  imageAlt = "Voucher image",
  code,
  discount,
  minimumSpend,
  expiryDate,
  onCopyCode,
  onShare,
  onDelete,
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

        <VoucherActionMenu
          id={id}
          code={code}
          onCopyCode={onCopyCode}
          onShare={onShare}
          onDelete={onDelete}
        />
      </div>
    </Card>
  );
}
