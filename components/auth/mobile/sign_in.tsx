"use client";

import Link from "next/link";

import {
  AuthDivider,
  AuthField,
  AuthLayout,
  AuthSocialButtons,
  CheckedAgreement,
  PasswordField,
} from "@/components/auth/mobile/auth-form";
import { Button } from "@/components/ui/button";

export function SignInMobile() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Please enter your details."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="font-semibold text-primary">
            Sign up
          </Link>
        </>
      }
    >
      <form className="flex flex-col gap-6">
        <div className="grid gap-3">
          <AuthField
            id="email-or-phone"
            label="Email or phone"
            placeholder="Enter email or phone number"
            required
          />

          <PasswordField required />
        </div>

        <div className="flex items-center justify-between gap-4">
          <CheckedAgreement id="remember-user">
            Remember for 30 days
          </CheckedAgreement>
          <Link
            href="/forgot-password"
            className="shrink-0 text-xs font-semibold text-primary"
          >
            Forgot password
          </Link>
        </div>

        <div className="grid gap-4">
          <Button type="submit" size="lg">
            Sign in
          </Button>

          <AuthDivider />
          <AuthSocialButtons />
        </div>
      </form>
    </AuthLayout>
  );
}
