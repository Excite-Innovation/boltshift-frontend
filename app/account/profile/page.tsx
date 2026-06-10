"use client";

import { useState } from "react";
import { Save } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { AccountSocialButtons } from "./account-social-buttons";
import { FormInputField } from "@/components/checkout/form-input-field";
import { PhoneInput } from "@/components/ui/phone-input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SectionHeadings } from "@/components/accounts/section-headings";
import { DatePickerField } from "@/app/account/profile/date-field";
import { SelectList } from "@/components/dropdown/select";

export function PersonalInfo() {
  return (
    <div className="flex flex-col gap-8">
      <BasicDetails />
      <Separator />
      <Address />
      <Separator />
      <Password />

      <div className="border-t py-6 flex justify-end items-center">
        <Button size="lg" className="w-full sm:w-auto px-4.5">
          <Save />
          Save Changes
        </Button>
      </div>
    </div>
  );
}

export default PersonalInfo;

function BasicDetails() {
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
          placeholder="Enter first name"
          className="h-auto sm:h-13 max-w-120"
        />
        <FormInputField
          id="last-name"
          label="Last Name"
          placeholder="Enter last name"
          className="h-auto sm:h-13 max-w-120"
        />
        <FormInputField
          id="email"
          label="Email Address"
          type="email"
          placeholder="Enter email address"
          className="h-auto sm:h-13 max-w-120"
        />
        <div className="w-full max-w-120 flex flex-col gap-1 text-muted-foreground text-xs font-medium">
          <Label htmlFor="phone">Phone Number</Label>
          <PhoneInput
            id="phone"
            placeholder="Enter phone number"
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

function Address() {
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
          placeholder="Enter appartment details"
          className="h-auto sm:h-13 max-w-120"
        />
        <FormInputField
          id="street address"
          label="Street Address"
          type="text"
          placeholder="Enter street address"
          className="h-auto sm:h-13 max-w-120"
        />
        <FormInputField
          id="country"
          label="Country"
          type="text"
          placeholder="Enter your country"
          className="h-auto sm:h-13 max-w-120"
        />
        <FormInputField
          id="city/town"
          label="City/Town"
          type="text"
          placeholder="Enter your City/Town"
          className="h-auto sm:h-13 max-w-120"
        />
      </form>
    </div>
  );
}

function Password() {
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
