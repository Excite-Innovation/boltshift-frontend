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
import {
  ColorPicker,
  ColorPickerAlpha,
  ColorPickerEyeDropper,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  ColorPickerSelection,
} from "@/components/ui/color-picker";

const DEFAULT_PICKER_COLOR = "#3d434e";

function rgbaToHex(value: unknown) {
  if (!Array.isArray(value)) return DEFAULT_PICKER_COLOR;

  const [red = 0, green = 0, blue = 0] = value;
  const toHex = (channel: unknown) =>
    Math.max(0, Math.min(255, Math.round(Number(channel) || 0)))
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

type GradientSelectorModalProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialColor?: string;
  onSave?: (color: string) => void;
};

export function GradientSelectorModal({
  open,
  defaultOpen = true,
  onOpenChange,
  initialColor = DEFAULT_PICKER_COLOR,
  onSave,
}: GradientSelectorModalProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const [selectedColor, setSelectedColor] = React.useState(initialColor);

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

    setSelectedColor(initialColor);
  }, [currentOpen, initialColor]);

  return (
    <Dialog open={currentOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        overlayClassName="z-[60] bg-black/35"
        className="z-70 w-[calc(100vw-1.25rem)] max-w-96.5 gap-0 overflow-hidden rounded-xl border bg-background p-0 shadow-0 sm:max-w-96.5"
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
                Change card color and apply graphics
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="pt-8 grid gap-4">
            <ColorPicker
              key={`${currentOpen}-${initialColor}`}
              defaultValue={selectedColor}
              onChange={(value) => setSelectedColor(rgbaToHex(value))}
              className="h-auto w-full gap-4"
            >
              <ColorPickerSelection className="h-40 rounded-xl border" />
              <ColorPickerHue />
              <ColorPickerAlpha />

              <div className="flex items-center gap-2">
                <ColorPickerEyeDropper className="size-8 rounded-md shadow-none" />
                <ColorPickerOutput />
                <ColorPickerFormat />
              </div>
            </ColorPicker>

            <div className="grid gap-2">
              <div
                className="h-14 w-full rounded-xl border"
                style={{ backgroundColor: selectedColor }}
              />
            </div>
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
                onSave?.(selectedColor);
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
