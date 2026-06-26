"use client";

import { ArrowLeft, Eye, User, UserRoundPlus, Flag } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SectionHeadings } from "@/components/accounts/section-headings";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/types/orders/types";

type DetailRowProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

function DetailRow({ icon, label, value }: DetailRowProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl border bg-muted/20 p-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-background">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}

export function OrderDetailsDrawer({ order }: { order: Order }) {
  const statusLabel = order.status
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-9 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label={`View details for order ${order.id}`}
        >
          <Eye className="size-4" aria-hidden="true" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="data-[vaul-drawer-direction=right]:w-full sm:data-[vaul-drawer-direction=right]:max-w-lg border-r bg-background">
        <DrawerHeader className="flex flex-row items-center gap-6 border-b py-4 px-8">
          <DrawerTitle className="sr-only">Order Details</DrawerTitle>

          <DrawerClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="-ml-1 size-9 rounded-full"
              aria-label="Close order details"
            >
              <ArrowLeft className="size-7" aria-hidden="true" />
            </Button>
          </DrawerClose>

          <SectionHeadings
            icon="/popular-categories-icons/Shopping-bags.svg"
            title="Orders"
            alt="Shopping bag icon"
          />
        </DrawerHeader>

        <div className="no-scrollbar flex-1 overflow-y-auto p-8">
          <div className="flex gap-3">
            <div className="flex h-full flex-col items-center">
              <div className="flex items-center justify-center rounded-xl border p-3">
                <User className="size-6" />
              </div>
              <div className="mt-1 mb-1 w-px flex-1 min-h-10 bg-border" />
            </div>
            <div className="pt-1 pb-6">
              <p>Your details</p>
              <p>Please provide your name and email</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex h-full flex-col items-center">
              <div className="flex items-center justify-center rounded-xl border p-3">
                <Flag className="size-6" />
              </div>
              <div className="mt-1 mb-1 w-px flex-1 min-h-10 bg-border" />
            </div>
            <div className="pt-1 pb-6">
              <p>Invite your team</p>
              <p>Start collaborating with your team</p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex h-full flex-col items-center">
              <div className="flex items-center justify-center rounded-xl border p-3">
                <UserRoundPlus className="size-6" />
              </div>
              <div className="mt-1 mb-1 w-px flex-1 min-h-10 bg-border" />
            </div>
            <div className="pt-1 pb-6">
              <p>Company details</p>
              <p>A few details about your company</p>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
