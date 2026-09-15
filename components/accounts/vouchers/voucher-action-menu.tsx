"use client";

import { Copy, MoreVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VoucherSocialShareMenu } from "@/components/accounts/vouchers/voucher-social-share-menu";

type VoucherActionMenuProps = {
  code: string;
  onCopyCode?: (code: string) => void;
  onShare?: (code: string) => void;
};

export function VoucherActionMenu({
  code,
  onCopyCode,
  onShare,
}: VoucherActionMenuProps) {
  const handleCopyCode = async () => {
    if (onCopyCode) {
      onCopyCode(code);
      return;
    }

    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(code);
    }
  };

  return (
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
        side="left"
        sideOffset={8}
        className="w-48 gap-1 rounded-xl border p-3"
      >
        <DropdownMenuItem
          className="gap-2 rounded-lg p-4 text-sm font-medium"
          onSelect={() => {
            void handleCopyCode();
          }}
        >
          <Copy className="size-6 text-muted-foreground" />
          Copy Code
        </DropdownMenuItem>

        <VoucherSocialShareMenu code={code} onShare={onShare} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
