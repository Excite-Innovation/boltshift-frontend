"use client";

import type { ReactNode } from "react";
import { Trash2 } from "lucide-react";

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

type DeleteModalProps = {
  trigger: ReactNode;
  onConfirm: () => void;
  title?: string;
  description?: string;
  actionLabel?: string;
};

export function DeleteModal({
  trigger,
  onConfirm,
  title = "Remove Item",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  actionLabel = "Remove Item",
}: DeleteModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="w-[calc(100vw-1rem)] max-w-136 flex flex-col overflow-hidden rounded-xl border-0 p-0 gap-0">
        {/* Top section */}
        <div className="flex pt-6 px-6 gap-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/20 text-primary shrink-0">
            <Trash2 className="size-6" aria-hidden="true" />
          </div>

          <DialogHeader className="gap-1 text-left">
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
              variant="destructive"
              className="h-12 rounded-lg py-2.5 px-4 border-2 text-base font-semibold cursor-pointer"
              onClick={onConfirm}
            >
              {actionLabel}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

{
  /* <div className="pointer-events-none absolute -left-16 -top-20 size-56 rounded-full border border-border/80" />
        <div className="pointer-events-none absolute -left-10 -top-14 size-44 rounded-full border border-border/70" />
        <div className="pointer-events-none absolute left-0 top-0 size-28 rounded-full border border-border/70" /> */
}
