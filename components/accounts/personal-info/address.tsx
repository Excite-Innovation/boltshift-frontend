"use client";

import { FormInputField } from "@/components/checkout/form-input-field";
import { SectionHeadings } from "@/components/accounts/section-headings";

export function Address() {
  return (
    <div className="w-full flex flex-col gap-8 py-4">
      <SectionHeadings
        icon="/account/marker-pin-01.png"
        alt="location marker icon"
        title="Address"
      />

      <form className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-xs font-medium w-full max-w-248">
        <FormInputField
          id="apartment details"
          label="Apartment Details"
          type="text"
          className="h-auto sm:h-13 max-w-120"
        />
        <FormInputField
          id="street address"
          label="Street Address"
          type="text"
          className="h-auto sm:h-13 max-w-120"
        />
        <FormInputField
          id="country"
          label="Country"
          type="text"
          className="h-auto sm:h-13 max-w-120"
        />
        <FormInputField
          id="city/town"
          label="City/Town"
          type="text"
          className="h-auto sm:h-13 max-w-120"
        />
      </form>
    </div>
  );
}
