"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

import { DeleteModal } from "@/components/delete-item/delete-modal";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
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
  /** Prevents decreasing below the minimum allowed quantity. */
  decrementDisabled?: boolean;
  className?: string;
  /** Short currency label shown before the formatted price. */
  currencyLabel?: string;
  removeLabel?: string;
  decrementLabel?: string;
  incrementLabel?: string;
  removeTitle?: string;
  removeDescription?: string;
  removeActionLabel?: string;
};

/**
 * Price and quantity controls used inside cart-like item rows.
 */
export function CartQuantityGroup({
  price,
  quantity,
  onRemove,
  onDecrement,
  onIncrement,
  decrementDisabled = false,
  className,
  currencyLabel = "Kshs.",
  removeLabel = "Remove item",
  decrementLabel = "Decrease quantity",
  incrementLabel = "Increase quantity",
  removeTitle = "Remove Item from Cart",
  removeDescription = "Are you sure you want to delete this item from cart? This action cannot be undone.",
  removeActionLabel = "Remove Item",
}: CartQuantityGroupProps) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between md:max-w-93.75 md:justify-start md:gap-4",
        className,
      )}
    >
      <DeleteModal
        title={removeTitle}
        description={removeDescription}
        actionLabel={removeActionLabel}
        onConfirm={() => onRemove?.()}
        trigger={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={removeLabel}
            disabled={!onRemove}
            className="justify-self-start text-muted-foreground hover:text-destructive md:justify-self-center"
          >
            <Trash2 className="size-4" />
          </Button>
        }
      />

      <div className="flex items-center gap-1 text-sm md:justify-self-start">
        <span className="text-muted-foreground">{currencyLabel}</span>
        <span className="font-medium">{EditNum(price)}</span>
      </div>

      <ButtonGroup
        aria-label="Quantity controls"
        className="h-10 w-32 overflow-hidden rounded-lg border bg-background md:justify-self-start"
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={decrementLabel}
          onClick={onDecrement}
          disabled={decrementDisabled}
          className="h-full flex-1 rounded-none text-muted-foreground"
        >
          <Minus className="size-4" />
        </Button>

        <ButtonGroupText className="h-full min-w-8 flex-1 justify-center rounded-none border-0 bg-transparent px-0 text-sm font-semibold shadow-none">
          {quantity}
        </ButtonGroupText>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={incrementLabel}
          onClick={onIncrement}
          className="h-full flex-1 rounded-none text-muted-foreground"
        >
          <Plus className="size-4" />
        </Button>
      </ButtonGroup>
    </div>
  );
}
