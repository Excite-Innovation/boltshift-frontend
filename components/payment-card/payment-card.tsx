"use client";

import * as React from "react";
import { MoreVertical, RotateCcw, Trash2 } from "lucide-react";
import { FaApple } from "react-icons/fa";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { paymentCardExamples } from "@/components/payment-card/lib/payment-card-examples";
import type { PaymentCardProps, SavedPaymentCard } from "@/lib/payment-types";
import { cn } from "@/lib/utils";

type PaymentCardFlipperProps = {
  front: React.ReactNode;
  back: React.ReactNode;
  flipped?: boolean;
  className?: string;
};

function PaymentCardFlipper({
  front,
  back,
  flipped = false,
  className,
}: PaymentCardFlipperProps) {
  return (
    <div
      className={cn(
        "group/payment-card h-[204px] w-full [perspective:1600px] sm:w-[340px]",
        className,
      )}
      data-flipped={flipped}
    >
      <div
        className={cn(
          "relative size-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d]",
          "group-hover/payment-card:[transform:rotateY(180deg)] data-[flipped=true]:[transform:rotateY(180deg)]",
        )}
      >
        <div className="absolute inset-0 size-full rounded-2xl [backface-visibility:hidden]">
          {front}
        </div>
        <div className="absolute inset-0 size-full rounded-2xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {back}
        </div>
      </div>
    </div>
  );
}

type PaymentCardOptionProps = {
  card: SavedPaymentCard;
  flipped?: boolean;
  onFlip?: () => void;
};

function PaymentCardOption({ card, flipped, onFlip }: PaymentCardOptionProps) {
  const id = React.useId();

  return (
    <label
      htmlFor={id}
      className={cn(
        "block w-full cursor-pointer rounded-2xl outline-none sm:w-[340px]",
        "focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
      )}
    >
      <span className="sr-only">Select {card.brand} ending in 4321</span>
      <PaymentCardFlipper
        flipped={flipped}
        front={
          <PaymentCardFace
            card={card}
            radioId={id}
            onFlip={onFlip}
            isBack={false}
          />
        }
        back={
          <PaymentCardFace card={card} radioId={id} onFlip={onFlip} isBack />
        }
      />
    </label>
  );
}

type PaymentCardFaceProps = {
  card: SavedPaymentCard;
  radioId: string;
  onFlip?: () => void;
  isBack: boolean;
};

function PaymentCardFace({
  card,
  radioId,
  onFlip,
  isBack,
}: PaymentCardFaceProps) {
  return (
    <div className="relative flex size-full overflow-hidden rounded-2xl bg-[#3d434e] p-4 text-white shadow-sm ring-1 ring-black/5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.12),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_42%)]" />

      <div className="relative flex size-full flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xl font-semibold leading-none">{card.brand}</p>

          <div className="flex items-center gap-2">
            {card.isDefault ? (
              <Badge
                variant="secondary"
                className="h-6 rounded-md bg-white px-2 text-xs font-medium text-[#3d434e] hover:bg-white"
              >
                <span className="size-1.5 rounded-full bg-[#7d8490]" />
                Default
              </Badge>
            ) : null}

            <RadioGroupItem
              id={radioId}
              value={card.id}
              className={cn(
                "size-5 border-white/80 bg-transparent text-white",
                "data-[state=checked]:border-white data-[state=checked]:bg-white data-[state=checked]:text-[#6d617c]",
                "[&_svg]:size-2.5",
              )}
            />

            <TooltipProvider>
              <Tooltip>
                <DropdownMenu>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        className="text-white hover:bg-white/10 hover:text-white"
                        aria-label="Payment card actions"
                      >
                        <MoreVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onSelect={(event) => event.preventDefault()}
                    >
                      Set as default
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onSelect={(event) => event.preventDefault()}
                    >
                      <Trash2 className="size-4" />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <TooltipContent>Card actions</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {isBack ? (
          <div className="space-y-6">
            <div className="-mx-4 h-11 bg-black/45" />
            <div className="flex items-center justify-between gap-3">
              <div className="h-9 flex-1 rounded-md bg-white/85" />
              <div className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#3d434e]">
                {card.cvv}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0 space-y-3">
              <div className="flex items-center gap-10 text-sm font-medium uppercase tracking-wide">
                <span className="truncate">{card.holder}</span>
                <span>{card.expiry}</span>
              </div>
              <p className="font-mono text-xl tracking-[0.22em] text-white">
                {card.number}
              </p>
            </div>

            <div className="flex h-9 shrink-0 items-center gap-1 rounded-md bg-white/10 px-2 text-sm font-semibold">
              <FaApple className="size-4" />
              Pay
            </div>
          </div>
        )}
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        className="absolute right-3 bottom-3 text-white hover:bg-white/10 hover:text-white"
        onClick={(event) => {
          event.preventDefault();
          onFlip?.();
        }}
        aria-label={isBack ? "Show card front" : "Show card back"}
      >
        <RotateCcw className="size-3.5" />
      </Button>
    </div>
  );
}

export function PaymentCard({
  cards = paymentCardExamples,
  defaultSelectedCardId,
  step = 4,
  title = "Payment Card",
  className,
}: PaymentCardProps) {
  const fallbackSelectedCardId = cards[1]?.id ?? cards[0]?.id ?? "";
  const [selectedCard, setSelectedCard] = React.useState(
    defaultSelectedCardId ?? fallbackSelectedCardId,
  );
  const [flippedCard, setFlippedCard] = React.useState<string | null>(null);

  React.useEffect(() => {
    setSelectedCard(defaultSelectedCardId ?? fallbackSelectedCardId);
    setFlippedCard(null);
  }, [defaultSelectedCardId, fallbackSelectedCardId]);

  return (
    <Card className={cn("w-full border-0 py-4 shadow-none", className)}>
      <CardHeader className="flex items-center gap-4 px-0">
        <div className="flex size-8 items-center justify-center rounded-full bg-primary text-lg font-semibold text-card">
          {step}
        </div>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>

      <CardContent className="px-0">
        <RadioGroup
          value={selectedCard}
          onValueChange={setSelectedCard}
          className="flex flex-wrap justify-start gap-6"
        >
          {cards.map((card) => (
            <PaymentCardOption
              key={card.id}
              card={card}
              flipped={flippedCard === card.id}
              onFlip={() =>
                setFlippedCard((currentCard) =>
                  currentCard === card.id ? null : card.id,
                )
              }
            />
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
