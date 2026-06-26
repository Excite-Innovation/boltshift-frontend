"use client";

import { useState } from "react";

import { DashedSeparator } from "@/components/separator/dashed-separator";
import { SectionHeadings } from "@/components/accounts/section-headings";
import { VoucherCodeInput } from "@/components/accounts/vouchers/voucher-code-input";
import { VoucherCard } from "@/components/accounts/vouchers/voucher-card";
import { vouchers } from "@/components/accounts/vouchers/data";
import type { Voucher } from "@/components/accounts/vouchers/data";

export function Vouchers() {
  const [voucher, setVoucher] = useState("");
  const [voucherList, setVoucherList] = useState<Voucher[]>(() => vouchers);

  const handleAdd = () => {
    console.log("Voucher:", voucher);
  };

  const handleDeleteVoucher = (voucherId: string) => {
    setVoucherList((currentVouchers) =>
      currentVouchers.filter(({ id }) => id !== voucherId),
    );
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
            id={voucher.id}
            imageSrc={voucher.image}
            code={voucher.code}
            discount={voucher.discount}
            minimumSpend={voucher.minimumSpend}
            expiryDate={voucher.expiryDate}
            onDelete={handleDeleteVoucher}
          />
        ))}
      </div>
    </div>
  );
}

export default Vouchers;
