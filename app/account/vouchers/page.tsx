"use client";

import { useEffect, useState } from "react";

import { DashedSeparator } from "@/components/separator/dashed-separator";
import { SectionHeadings } from "@/components/accounts/section-headings";
import { VoucherCodeInput } from "@/components/accounts/vouchers/voucher-code-input";
import { VoucherCard } from "@/components/accounts/vouchers/voucher-card";
import { showSonnerMessage } from "@/components/alert/alert";
import {
  CouponApiError,
  fetchCoupons,
  type Coupon,
  validateCoupon,
} from "@/lib/coupons/coupon-api";

export function Vouchers() {
  const [voucher, setVoucher] = useState("");
  const [voucherList, setVoucherList] = useState<Coupon[]>([]);

  useEffect(() => {
    void fetchCoupons()
      .then(setVoucherList)
      .catch((error) => {
        showSonnerMessage({
          variant: "delete",
          title: "Unable to load coupons",
          description:
            error instanceof CouponApiError
              ? error.message
              : "Please try again shortly.",
        });
      });
  }, []);

  const handleAdd = async () => {
    const code = voucher.trim();

    if (!code) return;

    try {
      const coupon = await validateCoupon(code);
      setVoucherList((current) =>
        current.some((item) => item.id === coupon.id || item.code === coupon.code)
          ? current
          : [coupon, ...current],
      );
      setVoucher("");
      showSonnerMessage({
        variant: "success",
        title: "Coupon added",
        description: `${coupon.code} is ready to use.`,
      });
    } catch (error) {
      showSonnerMessage({
        variant: "delete",
        title: "Invalid coupon",
        description:
          error instanceof CouponApiError
            ? error.message
            : "Please check the code and try again.",
      });
    }
  };

  return (
    <div className="flex min-w-0 flex-col gap-8 py-4">
      <SectionHeadings
        icon="/account/receipt-check.png"
        title="Vouchers"
        alt="receipt check icon"
      />

      <VoucherCodeInput
        value={voucher}
        onChange={setVoucher}
        onAdd={handleAdd}
      />

      <DashedSeparator />

      {/* Vouchers */}
      <div className="flex flex-wrap justify-center gap-6 sm:justify-start">
        {voucherList.map((voucher) => (
          <VoucherCard
            key={voucher.id}
            imageSrc="/account/voucher/Delivery-truck.png"
            code={voucher.code}
            discount={voucher.discount}
            minimumSpend={voucher.minimumSpend}
            expiryDate={voucher.expiryDate}
          />
        ))}
      </div>
    </div>
  );
}

export default Vouchers;
