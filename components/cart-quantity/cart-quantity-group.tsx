"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { cn, EditNum } from "@/lib/utils";

type CartQuantityGroupProps = {
  /** Unit/subtotal price displayed next to the currency label. */
  price: number;
  /** Current item quantity shown between the decrement and increment controls. */
  quantity: number;
  /** Removes the current cart or wishlist item. */
  onRemove?: () => void;
  /** Decreases the current item quantity. */
  onDecrement?: () => void;
  /** Increases the current item quantity. */
  onIncrement?: () => void;
  className?: string;
  /** Short currency label shown before the formatted price. */
  currencyLabel?: string;
  removeLabel?: string;
  decrementLabel?: string;
  incrementLabel?: string;
};

/**
 * Compact price and quantity control used inside cart-like item rows.
 */
export function CartQuantityGroup({
  price,
  quantity,
  onRemove,
  onDecrement,
  onIncrement,
  className,
  currencyLabel = "Kshs.",
  removeLabel = "Remove item",
  decrementLabel = "Decrease quantity",
  incrementLabel = "Increase quantity",
}: CartQuantityGroupProps) {
  return (
    <div
      className={cn(
        "flex h-10 w-full items-center overflow-hidden bg-background text-foreground",
        className,
      )}
    >
      {/* Remove action for the current item. */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={removeLabel}
        onClick={onRemove}
        className="h-full w-10 rounded-none text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="size-4" />
      </Button>

      {/* Price display expands to fill the space between actions and controls. */}
      <div className="flex flex-1 items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          {currencyLabel}
        </span>
        <span className="truncate text-sm font-medium">
          {EditNum(price)}
        </span>
      </div>

      {/* Quantity stepper keeps decrement, value, and increment controls grouped. */}
      <ButtonGroup
        aria-label="Quantity controls"
        className="h-full min-w-32 shrink-0 overflow-hidden rounded-lg border-l border-input bg-background"
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={decrementLabel}
          onClick={onDecrement}
          className="h-full flex-1 rounded-none text-muted-foreground hover:bg-accent"
        >
          <Minus className="size-4" />
        </Button>

        <div className="flex h-full flex-1 items-center justify-center text-2xl font-semibold">
          {quantity}
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={incrementLabel}
          onClick={onIncrement}
          className="h-full flex-1 rounded-none text-muted-foreground hover:bg-accent"
        >
          <Plus className="size-4" />
        </Button>
      </ButtonGroup>
    </div>
  );
}
