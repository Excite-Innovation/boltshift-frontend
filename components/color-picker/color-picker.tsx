"use client";

import * as React from "react";
import { Brush } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const cardGradients = [
  {
    name: "Slate",
    className: "from-[#6b7280] to-[#545b66]",
  },
  {
    name: "Sunset",
    className: "from-[#ffd56a] to-[#ff7bb2]",
  },
  {
    name: "Lavender",
    className: "from-[#cfd7ff] to-[#e5d4ff]",
  },
  {
    name: "Mint",
    className: "from-[#8ed9e9] to-[#6ee7a4]",
  },
  {
    name: "Meadow",
    className: "from-[#e4f878] to-[#74e2a2]",
  },
  {
    name: "Sky",
    className: "from-[#71e5e8] to-[#57b8ee]",
  },
  {
    name: "Citrus",
    className: "from-[#ffd35a] to-[#ffe62f]",
  },
  {
    name: "Lilac",
    className: "from-[#e7d6ff] to-[#d7c4f2]",
  },
];

export type CardGradient = (typeof cardGradients)[number];

type GradientSelectorModalProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialGradientClassName?: string;
  onSave?: (gradient: CardGradient) => void;
};

export function GradientSelectorModal({
  open,
  defaultOpen = true,
  onOpenChange,
  initialGradientClassName,
  onSave,
}: GradientSelectorModalProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const [selectedGradient, setSelectedGradient] = React.useState<CardGradient>(
    () =>
      cardGradients.find(
        (gradient) => gradient.className === initialGradientClassName,
      ) ?? cardGradients[0],
  );

  const isControlled = open !== undefined;
  const currentOpen = isControlled ? open : internalOpen;

  function handleOpenChange(nextOpen: boolean) {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  }

  React.useEffect(() => {
    if (!currentOpen) return;

    setSelectedGradient(
      cardGradients.find(
        (gradient) => gradient.className === initialGradientClassName,
      ) ?? cardGradients[0],
    );
  }, [currentOpen, initialGradientClassName]);

  return (
    <Dialog open={currentOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        overlayClassName="z-[60] bg-black/35"
        className="z-[70] w-[calc(100vw-1.25rem)] max-w-96.5 gap-0 overflow-hidden rounded-xl border bg-background p-0 shadow-0 sm:max-w-96.5"
      >
        <div className="p-4">
          <DialogHeader className="flex-row items-start pt-6 gap-4 text-left">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border">
              <Brush className="size-6" strokeWidth={2.25} />
            </div>

            <div className="min-w-0 grid gap-1">
              <DialogTitle className="text-lg font-semibold">
                Personalize Card
              </DialogTitle>

              <DialogDescription className="text-sm">
                Change gradient color and apply graphics
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="pt-8 grid gap-2">
            <div className="flex items-center gap-2">
              {cardGradients.map((gradient) => {
                const active = selectedGradient.name === gradient.name;

                return (
                  <button
                    key={gradient.name}
                    type="button"
                    onClick={() => setSelectedGradient(gradient)}
                    aria-label={`Select ${gradient.name} gradient`}
                    aria-pressed={active}
                    className={cn(
                      "grid size-8 place-items-center rounded-full transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ec4899] focus-visible:ring-offset-2",
                      active && "ring-2 ring-[#ec4899] ring-offset-2",
                    )}
                  >
                    <span
                      className={cn(
                        "size-7 rounded-full bg-gradient-to-br",
                        gradient.className,
                        active && "border-[3px] border-white",
                      )}
                    />
                  </button>
                );
              })}
            </div>

            <div
              className={cn(
                "h-40 w-full rounded-xl border bg-gradient-to-br",
                selectedGradient.className,
              )}
            />
          </div>

          <div className="py-8 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleOpenChange(false)}
            >
              Close
            </Button>

            <Button
              size="lg"
              onClick={() => {
                onSave?.(selectedGradient);
                handleOpenChange(false);
              }}
            >
              Save changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
