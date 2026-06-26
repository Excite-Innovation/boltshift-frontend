"use client";

import { Copy, MoreVertical, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteModal } from "@/components/delete-item/delete-modal";
import { VoucherSocialShareMenu } from "@/components/accounts/vouchers/voucher-social-share-menu";

type VoucherActionMenuProps = {
  id: string;
  code: string;
  onCopyCode?: (code: string) => void;
  onShare?: (code: string) => void;
  onDelete?: (id: string) => void;
};

export function VoucherActionMenu({
  id,
  code,
  onCopyCode,
  onShare,
  onDelete,
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

  const handleDelete = () => {
    onDelete?.(id);
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
              <Trash2 className="size-6" />
              Delete
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
