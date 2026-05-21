const MASKED_CARD_GROUP = "••••";

// Normalize card numbers for masking and screen-reader labels.
function getCardDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function getAccessibleCardEnding(value: string) {
  const digits = getCardDigits(value);

  return digits.slice(-4) || value.slice(-4);
}

export function getDisplayCardNumber(value: string, shouldHide: boolean) {
  if (!shouldHide) {
    return value;
  }

  const digits = getCardDigits(value);

  if (digits.length <= 8) {
    return value;
  }

  return `${digits.slice(0, 4)} ${MASKED_CARD_GROUP} ${MASKED_CARD_GROUP} ${digits.slice(-4)}`;
}
