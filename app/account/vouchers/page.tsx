"use client";

import { useState } from "react";

import { DashedSeparator } from "@/components/separator/dashed-separator";
import { SectionHeadings } from "@/components/accounts/section-headings";
import { VoucherCodeInput } from "@/components/accounts/vouchers/voucher-code-input";
import { VoucherCard } from "@/components/accounts/vouchers/voucher-card";
import { vouchers } from "@/components/accounts/vouchers/data";

export function Vouchers() {
  const [voucher, setVoucher] = useState("");

  const handleAdd = () => {
    console.log("Voucher:", voucher);
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
      <div className="flex flex-wrap gap-6">
        {vouchers.map((voucher) => (
          <VoucherCard
            key={`${voucher.code}-${voucher.discount}`}
            imageSrc={voucher.image}
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
