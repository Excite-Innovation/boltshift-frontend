"use client";

import { useState } from "react";

import { AccountSocialButtons } from "@/app/account/profile/account-social-buttons";
import { DatePickerField } from "@/app/account/profile/date-field";
import { FormInputField } from "@/components/checkout/form-input-field";
import { SelectList } from "@/components/dropdown/select";
import { SectionHeadings } from "@/components/accounts/section-headings";
import { PhoneInput } from "@/components/ui/phone-input";
import { Label } from "@/components/ui/label";

export function BasicDetails() {
  const [sex, setSex] = useState("");
  const options = ["Male", "Female", "Other"];

  return (
    <div className="w-full flex flex-col gap-8 py-4">
      <SectionHeadings
        icon="/account/file-02.png"
        title="Basic Details"
        alt="Gear icon"
      />

      <div className="py-2 flex flex-col gap-5">
        <p className="font-semibold">Connected Account:</p>

        <AccountSocialButtons />
      </div>

      <form className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-xs font-medium w-full max-w-248">
        <FormInputField
          id="first-name"
          label="First Name"
          className="h-auto sm:h-13 max-w-120"
        />
        <FormInputField
          id="last-name"
          label="Last Name"
          className="h-auto sm:h-13 max-w-120"
        />
        <FormInputField
          id="email"
          label="Email Address"
          type="email"
          className="h-auto sm:h-13 max-w-120"
        />
        <div className="w-full max-w-120 flex flex-col gap-1 text-muted-foreground text-xs font-medium">
          <Label htmlFor="phone">Phone Number</Label>
          <PhoneInput
            id="phone"
            className="hover:ring-1 hover:ring-ring hover:ring-offset-2"
          />
        </div>
        <div className="w-full max-w-120 flex flex-col gap-1 text-muted-foreground text-xs font-medium">
          <Label htmlFor="birthday">Birthday</Label>
          <DatePickerField />
        </div>
        <div className="w-full max-w-120 flex flex-col gap-1 text-muted-foreground text-xs font-medium">
          <Label htmlFor="sex">Sex</Label>
          <SelectList list={options} value={sex} onValueChange={setSex} />
        </div>
      </form>
    </div>
  );
}
