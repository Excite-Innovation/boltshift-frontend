import { Save } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { AccountSocialButtons } from "./account-social-buttons";
import { FormInputField } from "@/components/checkout/form-input-field";
import { PhoneInput } from "@/components/ui/phone-input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PersonalInfo() {
  return (
    <div className="grid gap-8">
      <BasicDetails />
      <Separator />
      <Address />
      <Separator />
      <Password />

      <div className="border-t py-6 flex justify-end items-center">
        <Button size="lg" className="px-4.5">
          <Save />
          Save Changes
        </Button>
      </div>
    </div>
  );
}

export default PersonalInfo;

type sectionProps = {
  icon: string;
  alt: string;
  title: String;
};

function SectionHeadings({ icon, alt, title }: sectionProps) {
  return (
    <div className={cn("flex items-center gap-2")}>
      <div className="flex items-center justify-center">
        <img src={icon} alt={alt} className="w-6 h-6" />
      </div>

      <span className="h-8 font-semibold text-2xl">{title}</span>
    </div>
  );
}

function BasicDetails() {
  return (
    <div className="flex flex-col gap-8 py-4">
      <SectionHeadings
        icon="/account/file-02.png"
        title="Basic Details"
        alt="Gear icon"
      />

      <div className="py-2 flex flex-col gap-5">
        <p className="font-semibold">Connected Account:</p>

        <AccountSocialButtons />
      </div>

      <form className="flex flex-wrap justify-start text-xs font-medium gap-8">
        <FormInputField
          id="first-name"
          label="First Name"
          placeholder="Enter first name"
          className="h-13 max-w-120"
        />
        <FormInputField
          id="last-name"
          label="Last Name"
          placeholder="Enter last name"
          className="h-13 max-w-120"
        />
        <FormInputField
          id="email"
          label="Email Address"
          type="email"
          placeholder="Enter email address"
          className="h-13 max-w-120"
        />
        <div className="w-full max-w-120 flex flex-col gap-1 text-muted-foreground text-xs font-medium">
          <Label htmlFor="phone">Phone Number</Label>
          <PhoneInput
            id="phone"
            placeholder="Enter phone number"
            className="hover:ring-1 hover:ring-ring hover:ring-offset-2"
          />
        </div>
        <FormInputField
          id="birthday"
          label="Birthday"
          type="calendar"
          placeholder="mm dd, yy"
          className="h-13 max-w-120"
        />
        <FormInputField
          id="sex"
          label="Sex"
          type="dropdown"
          placeholder="Choose"
          className="h-13 max-w-120"
        />
      </form>
    </div>
  );
}

function Address() {
  return (
    <div className="flex flex-col gap-8 py-4">
      <SectionHeadings
        icon="/account/marker-pin-01.png"
        alt="location marker icon"
        title="Address"
      />

      <form className="flex flex-wrap justify-start text-xs font-medium gap-8">
        <FormInputField
          id="apartment details"
          label="Apartment Details"
          type="text"
          placeholder="Enter appartment details"
          className="h-13 max-w-120"
        />
        <FormInputField
          id="street address"
          label="Street Address"
          type="text"
          placeholder="Enter street address"
          className="h-13 max-w-120"
        />
        <FormInputField
          id="country"
          label="Country"
          type="text"
          placeholder="Enter your country"
          className="h-13 max-w-120"
        />
        <FormInputField
          id="city/town"
          label="City/Town"
          type="text"
          placeholder="Enter your City/Town"
          className="h-13 max-w-120"
        />
      </form>
    </div>
  );
}

function Password() {
  return (
    <div className="flex flex-col gap-8 py-4">
      <SectionHeadings
        icon="/account/passcode-lock.png"
        alt="password and lock icon"
        title="Password"
      />

      <form className="flex flex-wrap justify-start text-xs font-medium gap-8">
        <FormInputField
          id="old password"
          label="Old Password"
          type="password"
          className="h-13 max-w-120"
        />
        <FormInputField
          id="new password"
          label="New Password"
          type="password"
          className="h-13 max-w-120"
        />
      </form>
    </div>
  );
}
