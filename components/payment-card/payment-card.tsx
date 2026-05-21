"use client";

import * as React from "react";
import { Eye, EyeOff, MoreVertical, RotateCcw } from "lucide-react";
import { MdOutlineCreditScore, MdCreditCard } from "react-icons/md";
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
import {
  getAccessibleCardEnding,
  getDisplayCardNumber,
} from "@/lib/payment-card-utils";
import type {
  PaymentCardProps,
  SavedPaymentCard,
} from "@/types/payment/payment-types";
import { cn } from "@/lib/utils";

const DEFAULT_CARD_BACKGROUND = "#3d434e";

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
        "group/payment-card h-51 w-full perspective-[1600px] sm:w-85",
        className,
      )}
      data-flipped={flipped}
    >
      {/* Preserve both faces in a shared 3D scene so hover and button flips use the same motion. */}
      <div
        className={cn(
          "relative size-full rounded-2xl transition-transform duration-700 transform-3d",
          "group-hover/payment-card:transform-[rotateY(-180deg)] data-[flipped=true]:transform-[rotateY(180deg)]",
        )}
      >
        <div className="absolute inset-0 size-full rounded-2xl backface-hidden">
          {front}
        </div>
        <div className="absolute inset-0 size-full rounded-2xl backface-hidden transform-[rotateY(180deg)]">
          {back}
        </div>
      </div>
    </div>
  );
}

type PaymentCardOptionProps = {
  card: SavedPaymentCard;
  hideNumber: boolean;
  flipped?: boolean;
  onFlip?: () => void;
};

function PaymentCardOption({
  card,
  hideNumber,
  flipped,
  onFlip,
}: PaymentCardOptionProps) {
  const id = React.useId();
  const accessibleEnding = getAccessibleCardEnding(card.number);

  return (
    // The label lets the whole card act as the selectable radio target.
    <label
      htmlFor={id}
      className={cn(
        "block w-full cursor-pointer rounded-2xl outline-none sm:w-85",
        "focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
      )}
    >
      <span className="sr-only">
        Select {card.brand} ending in {accessibleEnding}
      </span>
      <PaymentCardFlipper
        flipped={flipped}
        front={
          <PaymentCardFace
            card={card}
            radioId={id}
            hideNumber={hideNumber}
            onFlip={onFlip}
            isBack={false}
          />
        }
        back={
          <PaymentCardFace
            card={card}
            radioId={id}
            hideNumber={hideNumber}
            onFlip={onFlip}
            isBack
          />
        }
      />
    </label>
  );
}

type PaymentCardFaceProps = {
  card: SavedPaymentCard;
  radioId: string;
  hideNumber: boolean;
  onFlip?: () => void;
  isBack: boolean;
};

function PaymentCardFace({
  card,
  radioId,
  hideNumber,
  onFlip,
  isBack,
}: PaymentCardFaceProps) {
  const cardBackgroundColor = card.backgroundColor ?? DEFAULT_CARD_BACKGROUND;
  const merchantName = card.merchantName ?? "Pay";
  const isAppleMerchant = merchantName.toLowerCase().includes("apple");
  const displayCardNumber = getDisplayCardNumber(card.number, hideNumber);

  return (
    <div
      className="relative flex size-full overflow-hidden rounded-2xl p-4 text-white shadow-sm ring-1 ring-black/5"
      style={{ backgroundColor: cardBackgroundColor }}
    >
      {/* A subtle overlay keeps custom card colors from feeling flat. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.12),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_42%)]" />

      <div className="relative flex size-full flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xl font-semibold leading-none">{card.brand}</p>

          <div className="flex items-center gap-3">
            {card.isDefault ? (
              <Badge
                variant="secondary"
                className="h-6 rounded-md bg-white text-xs font-medium border border-border text-[#414651] hover:bg-white"
              >
                <span className="size-1.5 rounded-full bg-[#717680]" />
                Default
              </Badge>
            ) : null}

            <RadioGroupItem
              id={radioId}
              value={card.id}
              className={cn(
                // Keeps the selector small, circular, and visible on the dark card surface.
                "size-5 border-white/80 bg-transparent text-white",

                // When selected, the radio keeps a muted fill while the inner indicator dot turns white.
                "data-[state=checked]:border-4 data-[state=checked]:border-white data-[state=checked]:bg-[#6d617c] data-[state=checked]:text-white",

                // Shrinks the default shadcn/radix indicator icon to fit the custom radio size.
                "[&_svg]:size-1.5",
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
                  <DropdownMenuContent
                    align="start"
                    className="p-3 text-sm font-medium gap-2 border rounded-xl"
                  >
                    <DropdownMenuItem
                      onSelect={(event) => event.preventDefault()}
                      className="p-4 rounded-lg"
                    >
                      <MdOutlineCreditScore className="size-4" />
                      Make default
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={(event) => event.preventDefault()}
                      className="p-4 rounded-lg"
                    >
                      <MdCreditCard />
                      Edit Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onSelect={(event) => event.preventDefault()}
                      className="p-4 rounded-lg"
                    >
                      <MdCreditCard className="size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <TooltipContent>Card actions</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {isBack ? (
          // Back side mirrors a physical card strip and CVV block.
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
              <p className="font-mono font-semibold text-base tracking-[0.22em] text-white">
                {displayCardNumber}
              </p>
            </div>

            <div className="flex h-9 shrink-0 items-center gap-1 rounded-md bg-white/10 px-2 text-sm font-semibold">
              {card.merchantIcon ??
                (isAppleMerchant ? <FaApple className="size-4" /> : null)}
              {/* {merchantName} */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function PaymentCard({
  cards = paymentCardExamples,
  defaultSelectedCardId,
  defaultHideCardNumbers = true,
  step = 4,
  title = "Payment Card",
  className,
}: PaymentCardProps) {
  const fallbackSelectedCardId = cards[1]?.id ?? cards[0]?.id ?? "";
  const [selectedCard, setSelectedCard] = React.useState(
    defaultSelectedCardId ?? fallbackSelectedCardId,
  );
  const [flippedCard, setFlippedCard] = React.useState<string | null>(null);
  const [hideCardNumbers, setHideCardNumbers] = React.useState(
    defaultHideCardNumbers,
  );

  React.useEffect(() => {
    // Keep local selection in sync when Storybook controls or parent props change.
    setSelectedCard(defaultSelectedCardId ?? fallbackSelectedCardId);
    setFlippedCard(null);
  }, [defaultSelectedCardId, fallbackSelectedCardId]);

  React.useEffect(() => {
    setHideCardNumbers(defaultHideCardNumbers);
  }, [defaultHideCardNumbers]);

  return (
    <Card className={cn("w-full border-0 py-4 shadow-none", className)}>
      <CardHeader className="flex items-center gap-4 px-0">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-card">
            {step}
          </div>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => setHideCardNumbers((current) => !current)}
                aria-label={
                  hideCardNumbers ? "Show card numbers" : "Hide card numbers"
                }
              >
                {hideCardNumbers ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeOff className="size-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {hideCardNumbers ? "Show card numbers" : "Hide card numbers"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
              hideNumber={card.hideNumber ?? hideCardNumbers}
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
