"use client";

import Link from "next/link";

import {
  AuthDivider,
  AuthField,
  AuthLayout,
  CheckedAgreement,
  AuthSocialButtons,
  PasswordField,
} from "@/components/auth/mobile/auth-form";
import { Button } from "@/components/ui/button";

export function SignUpMobile() {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Join other million shoppers in the country."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/sign-in" className="font-semibold text-primary">
            Sign in
          </Link>
        </>
      }
    >
      <form className="flex flex-col gap-6">
        <div className="grid gap-4">
          <AuthField
            id="first-name"
            label="First Name*"
            placeholder="Bright"
            autoComplete="given-name"
            required
          />
          <AuthField
            id="last-name"
            label="Last Name*"
            placeholder="Kingdom"
            autoComplete="family-name"
            required
          />
          <AuthField
            id="email"
            label="Email*"
            type="email"
            placeholder="example@organization.company"
            autoComplete="email"
            required
          />
          <AuthField
            id="phone-number"
            label="Phone Number*"
            type="tel"
            placeholder="0705475879"
            autoComplete="tel"
            required
          />
          <PasswordField label="Password*" autoComplete="new-password" required />

          <CheckedAgreement
            id="terms-agreement"
            checkboxPosition="end"
            defaultChecked={false}
            required
          >
            I have read and agree with{" "}
            <Link
              href="/terms-and-privacy"
              className="font-semibold text-primary"
            >
              Ts&Cs and Privacy Policy
            </Link>
          </CheckedAgreement>
        </div>

        <div className="grid gap-4">
          <Button
            type="submit"
            size="lg"
          >
            Get Started
          </Button>
          <AuthDivider />
          <AuthSocialButtons />
        </div>
      </form>
    </AuthLayout>
  );
}
