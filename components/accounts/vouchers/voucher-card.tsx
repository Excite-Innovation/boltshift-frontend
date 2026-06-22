"use client";

import Image from "next/image";
import { Copy, MoreVertical, Share2, Trash2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteModal } from "@/components/delete-item/delete-modal";

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
  const handleCopyCode = async () => {
    if (onCopyCode) {
      onCopyCode(code);
      return;
    }

    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(code);
    }
  };

  const handleShare = async () => {
    if (onShare) {
      onShare(code);
      return;
    }

    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator.share({
        title: "Voucher code",
        text: code,
      });
    }
  };

  const handleDelete = () => {
    onDelete?.(id);
  };

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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1 z-10"
              aria-label="Voucher actions"
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            side="right"
            sideOffset={8}
            className="w-48 gap-1 rounded-xl border p-3"
          >
            <DropdownMenuItem
              className="gap-2 rounded-lg p-4 text-sm font-medium"
              onSelect={() => {
                void handleCopyCode();
              }}
            >
              <Copy className="size-4 text-muted-foreground" />
              Copy Code
            </DropdownMenuItem>

            <DropdownMenuItem
              className="gap-2 rounded-lg p-4 text-sm font-medium"
              onSelect={() => {
                void handleShare();
              }}
            >
              <Share2 className="size-4 text-muted-foreground" />
              Share
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-2 bg-muted-foreground/10" />

            <DeleteModal
              title="Delete Voucher"
              description="Are you sure you want to delete this voucher? This action cannot be undone."
              actionLabel="Delete Voucher"
              notification={{
                variant: "delete",
                title: "Voucher Deleted Successfully",
                description: `The voucher ${code} has been deleted.`,
                iconSrc: "/sonnar/Red-Featured-outline.svg",
              }}
              onConfirm={handleDelete}
              trigger={
                <DropdownMenuItem
                  variant="destructive"
                  className="gap-2 rounded-lg p-4 text-sm font-medium"
                  onSelect={(event) => event.preventDefault()}
                >
                  <Trash2 className="size-4" />
                  Delete
                </DropdownMenuItem>
              }
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}
