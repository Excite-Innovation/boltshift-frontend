"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import {
  AuthDivider,
  AuthField,
  AuthLayout,
  CheckedAgreement,
  AuthSocialButtons,
  PasswordField,
} from "@/components/auth/mobile/auth-form";
import { TermsAndPrivacy } from "@/components/terms-and-privacy/terms-and-privacy";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export const signUpAuthCopy = {
  title: "Create an account",
  subtitle: "Join other million shoppers in the country.",
};

type SignUpFormProps = {
  onTermsClick?: () => void;
};

function TermsAndPrivacyTrigger({
  onTermsClick,
}: {
  onTermsClick?: () => void;
}) {
  const trigger = (
    <button
      type="button"
      className="font-semibold text-primary"
      onClick={(event) => {
        if (!onTermsClick) return;

        event.preventDefault();
        event.stopPropagation();
        onTermsClick();
      }}
    >
      Ts&Cs and Privacy Policy
    </button>
  );

  if (onTermsClick) {
    return trigger;
  }

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="w-full data-[vaul-drawer-direction=right]:w-full sm:max-w-110">
        <DrawerHeader className="py-4 px-8 text-left">
          <DrawerClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="-ml-2 size-9"
              aria-label="Close terms and privacy drawer"
            >
              <ArrowLeft className="size-5" aria-hidden="true" />
            </Button>
          </DrawerClose>

          <DrawerTitle className="sr-only">Terms & Privacy</DrawerTitle>
        </DrawerHeader>

        <div className="no-scrollbar overflow-y-auto px-8 pb-12 pt-4">
          <TermsAndPrivacy />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function SignUpForm({ onTermsClick }: SignUpFormProps) {
  return (
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
          <TermsAndPrivacyTrigger onTermsClick={onTermsClick} />
        </CheckedAgreement>
      </div>

      <div className="grid gap-4">
        <Button type="submit" size="lg">
          Get Started
        </Button>
        <AuthDivider />
        <AuthSocialButtons />
      </div>
    </form>
  );
}

export function SignUpMobile() {
  return (
    <AuthLayout
      title={signUpAuthCopy.title}
      subtitle={signUpAuthCopy.subtitle}
      footer={
        <>
          Already have an account?{" "}
          <Link href="/sign-in" className="font-semibold text-primary">
            Sign in
          </Link>
        </>
      }
    >
      <SignUpForm />
    </AuthLayout>
  );
}
