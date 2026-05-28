"use client";

import * as React from "react";
import {
  Calendar,
  CreditCard,
  LockKeyhole,
  Mail,
  MoreVertical,
  ShieldCheck,
} from "lucide-react";
import { MdOutlineCreditScore, MdCreditCard, MdAddCard } from "react-icons/md";
import { FaApple } from "react-icons/fa";

import { showSonnerMessage } from "@/components/alert/alert";
import { DeleteModal } from "@/components/delete-item/delete-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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

type AddPaymentCardTileProps = {
  onClick?: () => void;
};

function AddPaymentCardTile({ onClick }: AddPaymentCardTileProps) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className={cn(
        "group h-47.5 w-full max-w-79 flex-col gap-4 whitespace-normal rounded-xl bg-backgroung px-5 py-0 text-center text-foreground shadow-none",
        "hover:text-primary hover:ring-2 hover:ring-ring hover:ring-offset-2",
      )}
      aria-label="Add a new payment card"
    >
      <span className="flex size-12 items-center justify-center rounded-lg border border-border bg-background transition-colors group-hover:border-border">
        <MdAddCard className="size-6" />
      </span>

      <span className="block text-base font-semibold">Add a New Card</span>

      <div className="flex flex-col gap-1">
        <span className="block text-xs">
          Your transaction is secured with SSL encryption
        </span>
        <ShieldCheck className="mx-auto size-6" strokeWidth={2} />
      </div>
    </Button>
  );
}

type AddPaymentCardModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "add" | "edit";
  card?: SavedPaymentCard | null;
  onSubmit?: (card: SavedPaymentCard) => void;
};

type AddPaymentCardFormValues = {
  holder: string;
  expiry: string;
  number: string;
  cvv: string;
  vendor: string;
  isDefault: boolean;
};

const emptyPaymentCardFormValues: AddPaymentCardFormValues = {
  holder: "",
  expiry: "",
  number: "",
  cvv: "",
  vendor: "",
  isDefault: false,
};

function getPaymentCardFormValues(
  card?: SavedPaymentCard | null,
): AddPaymentCardFormValues {
  if (!card) return emptyPaymentCardFormValues;

  return {
    holder: card.holder,
    expiry: card.expiry,
    number: card.number,
    cvv: card.cvv,
    vendor: card.brand,
    isDefault: card.isDefault === true,
  };
}

type PaymentInputFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  icon?: React.ReactNode;
  className?: string;
  inputClassName?: string;
} & React.ComponentProps<typeof Input>;

function PaymentInputField({
  id,
  label,
  required,
  icon,
  className,
  inputClassName,
  ...props
}: PaymentInputFieldProps) {
  return (
    <Field className={cn("gap-1.5", className)}>
      <FieldLabel htmlFor={id} className="gap-0 text-sm font-medium text-muted-foreground">
        {label}
        {required ? <span className="text-primary">*</span> : null}
      </FieldLabel>
      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute left-2.5 top-1/2 flex size-4 -translate-y-1/2 items-center justify-center text-muted-foreground">
            {icon}
          </span>
        ) : null}
        <Input
          id={id}
          required={required}
          className={cn(
            "h-8 rounded-md border-border bg-background text-base shadow-none focus-visible:ring-1",
            icon ? "pl-8" : null,
            inputClassName,
          )}
          {...props}
        />
      </div>
    </Field>
  );
}

function AddPaymentCardModal({
  open,
  onOpenChange,
  mode = "add",
  card,
  onSubmit,
}: AddPaymentCardModalProps) {
  const isEditMode = mode === "edit";
  const modalTitle = isEditMode ? "Edit Payment Card" : "Add a New Card";
  const sectionTitle = isEditMode
    ? "Edit payment method"
    : "Add a payment method";
  const submitLabel = isEditMode ? "Save" : "Add";
  const [formValues, setFormValues] = React.useState<AddPaymentCardFormValues>(
    () => getPaymentCardFormValues(card),
  );

  React.useEffect(() => {
    if (!open) return;

    setFormValues(getPaymentCardFormValues(card));
  }, [card, open]);

  const previewCard = React.useMemo<SavedPaymentCard>(
    () => ({
      id: "new-card-preview",
      brand: formValues.vendor || "Card Vendor",
      holder: formValues.holder || "Name on card",
      expiry: formValues.expiry || "MM / YY",
      number: formValues.number || "4321 1234 1234 1234",
      cvv: formValues.cvv || "CVV",
      isDefault: formValues.isDefault,
      backgroundColor: card?.backgroundColor ?? DEFAULT_CARD_BACKGROUND,
      merchantName: card?.merchantName ?? "ApplePay",
      merchantIcon: card?.merchantIcon ?? <FaApple className="size-4" />,
    }),
    [card, formValues],
  );

  const updateFormValue =
    (field: keyof AddPaymentCardFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.({
      ...(card ?? {
        id: `payment-card-${Date.now()}`,
        backgroundColor: DEFAULT_CARD_BACKGROUND,
        merchantName: "ApplePay",
        merchantIcon: <FaApple className="size-4" />,
      }),
      brand: formValues.vendor,
      holder: formValues.holder,
      expiry: formValues.expiry,
      number: formValues.number,
      cvv: formValues.cvv,
      isDefault: formValues.isDefault,
    });
    showSonnerMessage({
      variant: "success",
      title: isEditMode ? "Payment Card Updated" : "Payment Card Added",
      description: isEditMode
        ? "Your payment card details have been updated successfully."
        : "Your payment card has been added successfully.",
      iconSrc: "/sonnar/Green-Featured-outline.svg",
    });
    onOpenChange(false);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    // Limit to 4 digits (MMYY)
    value = value.slice(0, 4);

    // Add slash automatically after 2 digits
    if (value.length > 2) {
      value = `${value.slice(0, 2)} / ${value.slice(2)}`;
    }

    updateFormValue("expiry")({
      ...e,
      target: {
        ...e.target,
        value,
      },
    });
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // remove anything that's not a number
    value = value.replace(/\D/g, "");

    // hard limit to 3 digits (extra input is ignored)
    if (value.length > 3) return;

    updateFormValue("cvv")({
      ...e,
      target: {
        ...e.target,
        value,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-120 gap-4 overflow-y-auto rounded-xl p-4">
        <DialogHeader className="flex-row items-center gap-4 text-left">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-foreground">
            <MdAddCard className="size-6" />
          </div>
          <div className="min-w-0">
            <DialogTitle className="text-lg font-semibold">
              {modalTitle}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {modalTitle} by entering card details.
            </DialogDescription>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-2xl bg-linear-to-t from-[#FFF1EB] to-[#ACE0F9] p-4">
            <PaymentCardFlipper
              className="mx-auto"
              front={
                <PaymentCardFace
                  card={previewCard}
                  hideNumber={false}
                  isBack={false}
                  showControls={false}
                />
              }
              back={
                <PaymentCardFace
                  card={previewCard}
                  hideNumber={false}
                  isBack
                  showControls={false}
                />
              }
            />
          </div>

          <div className="pt-6 flex-col gap-1">
            <h3 className="text-lg/7 font-semibold">{sectionTitle}</h3>
            <p className="flex items-center gap-2 text-xs text-foreground">
              <ShieldCheck className="size-6 shrink-0" />
              Your transaction is secured with SSL encryption
            </p>
          </div>

          <FieldGroup className="gap-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_8rem]">
              <PaymentInputField
                id="payment-card-holder"
                label="Name on card"
                required
                icon={<Mail className="size-4" />}
                placeholder="Full name"
                value={formValues.holder}
                onChange={updateFormValue("holder")}
              />
              <PaymentInputField
                id="payment-card-expiry"
                label="Expiry"
                required
                icon={<Calendar className="size-4" />}
                placeholder="MM / YY"
                value={formValues.expiry}
                onChange={handleExpiryChange}
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_8rem]">
              <PaymentInputField
                id="payment-card-number"
                label="Card number"
                required
                inputClassName="pl-12"
                placeholder="1234 1234 1234 1234"
                value={formValues.number}
                onChange={updateFormValue("number")}
                icon={
                  <span className="relative flex h-4 w-6 items-center">
                    <span className="absolute left-0.5 size-3.5 rounded-full bg-[#eb001b]" />
                    <span className="absolute right-0 size-3.5 rounded-full bg-[#f79e1b] mix-blend-multiply" />
                  </span>
                }
              />
              <PaymentInputField
                id="payment-card-cvv"
                label="CVV"
                required
                type="password"
                icon={<LockKeyhole className="size-4" />}
                placeholder="•••"
                value={formValues.cvv}
                onChange={handleCvvChange}
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_8rem]">
              <PaymentInputField
                id="payment-card-vendor"
                label="Card Vendor"
                required
                icon={<CreditCard className="size-4" />}
                placeholder="Apple Pay"
                value={formValues.vendor}
                onChange={updateFormValue("vendor")}
              />

              <Field className="gap-1.5">
                <FieldLabel className="text-sm font-medium text-muted-foreground">
                  Personalize
                </FieldLabel>
                <Button
                  type="button"
                  variant="outline"
                  className="h-8 w-full rounded-md text-sm font-semibold shadow-none focus-visible:ring-1 focus-visible:ring-offset-2"
                >
                  Edit
                </Button>
              </Field>
            </div>
          </FieldGroup>

          <Field orientation="horizontal" className="gap-2">
            <Checkbox
              id="payment-card-default"
              checked={formValues.isDefault}
              onCheckedChange={(checked) =>
                setFormValues((current) => ({
                  ...current,
                  isDefault: checked === true,
                }))
              }
            />
            <FieldContent className="gap-0">
              <FieldLabel
                htmlFor="payment-card-default"
                className="text-sm font-medium"
              >
                Make Default
              </FieldLabel>
            </FieldContent>
          </Field>

          <DialogFooter className="grid grid-cols-2 gap-3 sm:grid-cols-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                size="lg"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              size="lg"
            >
              {submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

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
    <div className={cn("h-51 w-full max-w-79 perspective-[1600px]", className)}>
      {/* Preserve both faces in a shared 3D scene so click flips use the same motion. */}
      <div
        data-flipped={flipped}
        className={cn(
          "relative size-full rounded-2xl transition-transform duration-700 transform-3d",
          "data-[flipped=true]:transform-[rotateY(180deg)]",
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
  onDelete?: () => void;
  onSetDefault?: () => void;
  onEdit?: () => void;
};

function PaymentCardOption({
  card,
  hideNumber,
  flipped,
  onFlip,
  onDelete,
  onSetDefault,
  onEdit,
}: PaymentCardOptionProps) {
  const id = React.useId();
  const accessibleEnding = getAccessibleCardEnding(card.number);
  const handleClick = (event: React.MouseEvent<HTMLLabelElement>) => {
    const target = event.target as HTMLElement;

    if (
      target.closest(
        "button, input, [role='button'], [role='menuitem'], [data-slot='radio-group-item']",
      )
    ) {
      return;
    }

    onFlip?.();
  };

  return (
    // The label lets the whole card act as the selectable radio target.
    <label
      htmlFor={id}
      onClick={handleClick}
      className={cn(
        "block w-full max-w-79 cursor-pointer rounded-2xl outline-none",
        // "focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
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
            isBack={false}
            onDelete={onDelete}
            onSetDefault={onSetDefault}
            onEdit={onEdit}
          />
        }
        back={
          <PaymentCardFace
            card={card}
            radioId={id}
            hideNumber={hideNumber}
            isBack
            onDelete={onDelete}
            onSetDefault={onSetDefault}
            onEdit={onEdit}
          />
        }
      />
    </label>
  );
}

type PaymentCardFaceProps = {
  card: SavedPaymentCard;
  radioId?: string;
  hideNumber: boolean;
  isBack: boolean;
  showControls?: boolean;
  onDelete?: () => void;
  onSetDefault?: () => void;
  onEdit?: () => void;
};

function PaymentCardFace({
  card,
  radioId,
  hideNumber,
  isBack,
  showControls = true,
  onDelete,
  onSetDefault,
  onEdit,
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
        <div className="flex items-center justify-between gap-3">
          <p className="max-w-40 truncate text-base font-semibold leading-none">
            {card.brand}
          </p>

          {card.isDefault || showControls ? (
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

              {showControls && radioId ? (
                <>
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
                          align="end"
                          className="p-3 text-sm font-medium gap-2 border rounded-xl"
                        >

                          {/* Set card as default */}
                          <DropdownMenuItem
                            disabled={card.isDefault}
                            onSelect={() => onSetDefault?.()}
                            className="p-4 rounded-lg"
                          >
                            <MdOutlineCreditScore className="size-4" />
                            Make default
                          </DropdownMenuItem>

                          {/* Edit card details */}
                          <DropdownMenuItem
                            onSelect={() => onEdit?.()}
                            className="p-4 rounded-lg"
                          >
                            <MdCreditCard className="size-4" />
                            Edit Details
                          </DropdownMenuItem>

                          {/* Delete card */}
                          <DeleteModal
                            title="Remove Payment Card"
                            description="Are you sure you want to delete this payment card? This action cannot be undone."
                            actionLabel="Remove Card"
                            notification={{
                              variant: "delete",
                              title: "Payment Card Removed",
                              description:
                                "The payment card has been removed from your account.",
                              iconSrc: "/sonnar/Red-Featured-outline.svg",
                            }}
                            onConfirm={() => onDelete?.()}
                            trigger={
                              <DropdownMenuItem
                                variant="destructive"
                                onSelect={(event) => event.preventDefault()}
                                className="p-4 rounded-lg"
                              >
                                <MdCreditCard className="size-4" />
                                Delete
                              </DropdownMenuItem>
                            }
                          />
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <TooltipContent>Card actions</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : null}
            </div>
          ) : null}
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
  onRemoveCard,
  onSetDefaultCard,
  onUpdateCard,
  defaultSelectedCardId,
  defaultHideCardNumbers = true,
  step = 4,
  title = "Payment Card",
  className,
}: PaymentCardProps) {
  const [visibleCards, setVisibleCards] = React.useState(cards);
  const fallbackSelectedCardId =
    visibleCards[1]?.id ?? visibleCards[0]?.id ?? "";
  const [selectedCard, setSelectedCard] = React.useState(
    defaultSelectedCardId ?? fallbackSelectedCardId,
  );
  const [flippedCard, setFlippedCard] = React.useState<string | null>(null);
  const [hideCardNumbers, setHideCardNumbers] = React.useState(
    defaultHideCardNumbers,
  );
  const [paymentCardModalOpen, setPaymentCardModalOpen] = React.useState(false);
  const [editingCard, setEditingCard] = React.useState<SavedPaymentCard | null>(
    null,
  );

  React.useEffect(() => {
    setVisibleCards(cards);
  }, [cards]);

  React.useEffect(() => {
    // Keep local selection in sync when Storybook controls or parent props change.
    setSelectedCard(defaultSelectedCardId ?? fallbackSelectedCardId);
    setFlippedCard(null);
  }, [defaultSelectedCardId, fallbackSelectedCardId]);

  React.useEffect(() => {
    setHideCardNumbers(defaultHideCardNumbers);
  }, [defaultHideCardNumbers]);

  const handleRemoveCard = (cardId: string) => {
    setVisibleCards((currentCards) =>
      currentCards.filter((card) => card.id !== cardId),
    );
    setFlippedCard((currentCard) =>
      currentCard === cardId ? null : currentCard,
    );
    onRemoveCard?.(cardId);
  };

  const handleSetDefaultCard = (cardId: string) => {
    setVisibleCards((currentCards) =>
      currentCards.map((card) => ({
        ...card,
        isDefault: card.id === cardId,
      })),
    );
    setSelectedCard(cardId);
    onSetDefaultCard?.(cardId);
    showSonnerMessage({
      variant: "success",
      title: "Default Payment Card Updated",
      description: "This payment card is now your default payment method.",
      iconSrc: "/sonnar/Green-Featured-outline.svg",
    });
  };

  const handleOpenAddCardModal = () => {
    setEditingCard(null);
    setPaymentCardModalOpen(true);
  };

  const handleOpenEditCardModal = (card: SavedPaymentCard) => {
    setEditingCard(card);
    setPaymentCardModalOpen(true);
  };

  const handlePaymentCardSubmit = (card: SavedPaymentCard) => {
    setVisibleCards((currentCards) => {
      const existingCard = currentCards.some(
        (currentCard) => currentCard.id === card.id,
      );
      const nextCards = existingCard
        ? currentCards.map((currentCard) =>
            currentCard.id === card.id ? card : currentCard,
          )
        : [...currentCards, card];

      if (!card.isDefault) return nextCards;

      return nextCards.map((currentCard) => ({
        ...currentCard,
        isDefault: currentCard.id === card.id,
      }));
    });
    setSelectedCard(card.id);
    onUpdateCard?.(card);
  };

  return (
    <>
      <Card className={cn("w-full border-0 py-4 shadow-none", className)}>
        <CardHeader className="flex items-center gap-4 px-0">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-card">
              {step}
            </div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          </div>

          {/* Toggle for card numbers, don't remove */}
          {/* <TooltipProvider>
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
        </TooltipProvider> */}
        </CardHeader>

        <CardContent className="flex flex-wrap justify-center gap-8 px-0 md:justify-start">
          <RadioGroup
            value={selectedCard}
            onValueChange={setSelectedCard}
            className="contents"
          >
            {visibleCards.map((card) => (
              <PaymentCardOption
                key={card.id}
                card={card}
                hideNumber={card.hideNumber ?? hideCardNumbers}
                flipped={flippedCard === card.id}
                onDelete={() => handleRemoveCard(card.id)}
                onSetDefault={() => handleSetDefaultCard(card.id)}
                onEdit={() => handleOpenEditCardModal(card)}
                onFlip={() =>
                  setFlippedCard((currentCard) =>
                    currentCard === card.id ? null : card.id,
                  )
                }
              />
            ))}
          </RadioGroup>
          <AddPaymentCardTile onClick={handleOpenAddCardModal} />
        </CardContent>
      </Card>

      <AddPaymentCardModal
        open={paymentCardModalOpen}
        onOpenChange={setPaymentCardModalOpen}
        mode={editingCard ? "edit" : "add"}
        card={editingCard}
        onSubmit={handlePaymentCardSubmit}
      />
    </>
  );
}
