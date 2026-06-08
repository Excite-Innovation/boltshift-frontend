"use client";

import type { ReactNode } from "react";
import { Trash2 } from "lucide-react";
import Image from "next/image";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  showSonnerMessage,
  type SonnerMessageProps,
} from "@/components/alert/alert";

type ConfirmationModalProps = {
  trigger: ReactNode;
  onConfirm: () => void;
  title?: string;
  description?: string;
  actionLabel?: string;
  notification?: SonnerMessageProps | false;
  ringsSrc?: string;
  ringsAlt?: string;
};

const deleteNotification: SonnerMessageProps = {
  variant: "delete",
  title: "Item Removed Successfully",
  description: "The item has been removed from wishlist.",
  iconSrc: "/sonnar/Red-Featured-outline.svg",
};

export function ConfirmationModal({
  trigger,
  onConfirm,
  title = "Remove Item",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  actionLabel = "Remove Item",
  notification = false,
  ringsSrc = "/sonnar/rings.svg",
  ringsAlt = "svg rings displaying a ripple effect around the confirmation icon",
}: ConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm();

    if (notification) {
      showSonnerMessage(notification);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="w-[calc(100vw-1rem)] max-w-136 flex flex-col overflow-hidden rounded-xl border-0 p-0 gap-0">
        {/* Top section */}
        <div className="relative not-only:flex pt-6 px-6 gap-4">
          <Image
            src={ringsSrc}
            alt={ringsAlt}
            width={336}
            height={336}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-0 h-auto w-55 max-w-none select-none"
            priority
          />

          <div className="flex size-12 shrink-0 items-center justify-center">
            <div className="relative z-10 flex size-12 items-center justify-center border-2 rounded-full bg-primary/10 text-primary shrink-0">
              <Trash2 className="size-6" aria-hidden="true" />
            </div>
          </div>

          <DialogHeader className="gap-1 text-left z-10">
            <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
            <DialogDescription className="max-w-108 text-sm">
              {description}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Bottom section */}
        <DialogFooter className="pt-8 px-6 pb-6">
          <DialogClose asChild>
            <Button
              type="button"
              className="z-10"
              onClick={handleConfirm}
            >
              {actionLabel}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteModal(props: ConfirmationModalProps) {
  return (
    <ConfirmationModal
      notification={deleteNotification}
      {...props}
    />
  );
}
