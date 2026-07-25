"use client";

import { FormInputField } from "@/components/checkout/form-input-field";
import { SectionHeadings } from "@/components/accounts/section-headings";

export function Password() {
  return (
    <div className="w-full flex flex-col gap-8 py-4">
      <SectionHeadings
        icon="/account/passcode-lock.png"
        alt="password and lock icon"
        title="Password"
      />

      <form className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-xs font-medium w-full max-w-248">
        <FormInputField
          id="old password"
          label="Old Password"
          type="password"
          className="h-auto sm:h-13 max-w-120"
        />
        <FormInputField
          id="new password"
          label="New Password"
          type="password"
          className="h-auto sm:h-13 max-w-120"
        />
      </form>
    </div>
  );
}
