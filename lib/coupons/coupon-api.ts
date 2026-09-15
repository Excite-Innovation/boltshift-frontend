import { readStoredSession } from "@/lib/auth/storage";
import {
  collectApiItems,
  isRecord,
  toIdValue,
  toNumberValue,
  toStringValue,
} from "@/lib/products/shared";

const COUPONS_BASE_URL =
  process.env.NEXT_PUBLIC_COUPONS_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "";

export const AVAILABLE_COUPONS_PATH = "/api/v1/coupons/available/";
export const VALIDATE_COUPON_PATH = "/api/v1/coupons/validate/";

export type Coupon = {
  id: string;
  code: string;
  discount: string;
  minimumSpend: number;
  expiryDate: string;
};

export class CouponApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "CouponApiError";
  }
}

function buildCouponsUrl(path: string) {
  return COUPONS_BASE_URL
    ? `${COUPONS_BASE_URL.replace(/\/$/, "")}${path}`
    : path;
}

function getHeaders() {
  const headers = new Headers({ "Content-Type": "application/json" });
  const session = readStoredSession();

  if (session?.accessToken) {
    headers.set("Authorization", `Bearer ${session.accessToken}`);
  }

  return headers;
}

async function readPayload(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function errorMessage(payload: unknown, status: number) {
  if (isRecord(payload)) {
    const message = payload.detail ?? payload.message ?? payload.error;

    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  return `Coupon request failed (${status})`;
}

async function requestCoupons(path: string, init?: RequestInit) {
  const headers = getHeaders();

  if (init?.headers) {
    new Headers(init.headers).forEach((value, key) => headers.set(key, value));
  }

  const response = await fetch(buildCouponsUrl(path), {
    cache: "no-store",
    ...init,
    headers,
  });
  const payload = await readPayload(response);

  if (!response.ok) {
    throw new CouponApiError(errorMessage(payload, response.status), response.status);
  }

  return payload;
}

function formatExpiryDate(value: unknown) {
  const date = toStringValue(value);

  if (!date) return "No expiry date";

  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? date : parsed.toLocaleDateString();
}

export function normalizeCoupon(
  value: unknown,
  fallbackCode = "",
): Coupon | null {
  if (!isRecord(value)) return null;

  const code = toStringValue(value.code ?? value.coupon_code) || fallbackCode;
  const id = toIdValue(value.id) || code;

  if (!id || !code) return null;

  const percentage = toNumberValue(
    value.discount_percentage ?? value.discount_percent ?? value.percentage,
  );
  const amount = toNumberValue(value.discount_amount ?? value.amount);
  const discount =
    toStringValue(value.discount_display ?? value.discount) ||
    (percentage ? `${percentage}% off` : amount ? `Kshs. ${amount.toLocaleString()} off` : "Discount coupon");

  return {
    id,
    code,
    discount,
    minimumSpend: toNumberValue(
      value.minimum_spend ?? value.minimum_order_amount ?? value.min_purchase,
    ),
    expiryDate: formatExpiryDate(value.expires_at ?? value.expiry_date ?? value.valid_until),
  };
}

export async function fetchCoupons(): Promise<Coupon[]> {
  const payload = await requestCoupons(AVAILABLE_COUPONS_PATH);
  const items =
    isRecord(payload) && Array.isArray(payload.coupons)
      ? payload.coupons.filter(isRecord)
      : collectApiItems(payload);

  return items
    .map((item) => normalizeCoupon(item))
    .filter((coupon): coupon is Coupon => coupon !== null);
}

export async function validateCoupon(code: string): Promise<Coupon> {
  const payload = await requestCoupons(
    `${VALIDATE_COUPON_PATH}${encodeURIComponent(code.trim())}/`,
  );
  const couponPayload =
    isRecord(payload) && isRecord(payload.coupon)
      ? payload.coupon
      : isRecord(payload) && isRecord(payload.data)
        ? payload.data
        : payload;
  const coupon = normalizeCoupon(couponPayload, code.trim());

  if (!coupon) {
    throw new CouponApiError("The coupon response did not contain a valid code.", 422);
  }

  return coupon;
}
