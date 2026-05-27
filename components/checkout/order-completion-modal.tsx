"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type OrderCompletionModalProps = {
  open: boolean;
};

export function OrderCompletionModal({ open }: OrderCompletionModalProps) {
  return (
    <Dialog open={open} onOpenChange={() => undefined}>
      <DialogContent
        showCloseButton={false}
        onEscapeKeyDown={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
        className="w-[calc(100vw-1.5rem)] max-w-100 gap-0 rounded-xl border-0 p-0 shadow-xl sm:max-w-100"
      >
        <div className="flex flex-col items-center text-center">
          <div className="rounded-xl overflow-hidden">
            <Image
              src="/checkout/order-completion.png"
              alt="Animation of a delivery driver confirming orders"
              width={400}
              height={224}
              priority
              className="h-auto w-full"
            />
          </div>

          <DialogHeader className="pt-6 px-6 items-center gap-1 text-center">
            <DialogTitle className="text-lg font-semibold text-foreground">
              Your order is complete!
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground text-center">
              You will be receiving a confirmation email with order details.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex w-full justify-center py-8 px-6 sm:justify-center">
            <Button asChild size="lg" className="w-full">
              <Link href="/catalog">
                <ArrowLeft className="size-5" />
                Continue Shopping
              </Link>
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
