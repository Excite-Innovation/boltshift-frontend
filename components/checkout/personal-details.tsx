"use client";

import Image from "next/image";
import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";

import { SignInForm, signInAuthCopy } from "@/components/auth/mobile/sign_in";
import { SignUpForm, signUpAuthCopy } from "@/components/auth/mobile/sign_up";
import { AuthLayout } from "@/components/auth/mobile/auth-form";
import { TermsAndPrivacy } from "@/components/terms-and-privacy/terms-and-privacy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { SocialAuthButton } from "@/components/checkout/SocialAuthButton";
import { FormInputField } from "@/components/checkout/form-input-field";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

type AuthMode = "sign-in" | "sign-up" | "terms";

const authContent = {
  "sign-in": {
    ...signInAuthCopy,
    Form: SignInForm,
    footerText: "Don't have an account?",
    footerAction: "Sign up",
    nextMode: "sign-up" as const,
  },
  "sign-up": {
    ...signUpAuthCopy,
    Form: SignUpForm,
    footerText: "Already have an account?",
    footerAction: "Sign in",
    nextMode: "sign-in" as const,
  },
};

function CheckoutAuthDrawer() {
  const signinIcon = "/T&C/Locked_with_key.png";
  const signupIcon = "public/T&C/Office_worker.png";
  const termsAndConditionIcon = "/T&C/Scroll.png";

  const [authMode, setAuthMode] = useState<AuthMode>("sign-in");
  const isTermsView = authMode === "terms";
  const authModeContent =
    authMode === "terms" ? authContent["sign-up"] : authContent[authMode];
  const title = isTermsView
    ? "Privacy Policy and, Terms & Conditions"
    : authMode === "sign-up"
      ? "Sign Up"
      : "Sign In";

  const icon = isTermsView
    ? termsAndConditionIcon
    : authMode === "sign-up"
      ? signupIcon
      : signinIcon;

  return (
    <Drawer
      direction="right"
      onOpenChange={(open) => open && setAuthMode("sign-in")}
    >
      <DrawerTrigger asChild>
        <SocialAuthButton
          provider="Email"
          icon={<Mail className="text-card size-6" />}
          className="bg-primary text-card hover:bg-primary hover:text-card"
        />
      </DrawerTrigger>
      <DrawerContent className="data-[vaul-drawer-direction=right]:w-full sm:max-w-lg">
        <DrawerHeader className="py-4 px-8 text-left flex flex-row items-center">
          {isTermsView ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="-ml-2 size-9"
              aria-label="Back to sign up"
              onClick={() => setAuthMode("sign-up")}
            >
              <ArrowLeft className="size-5" aria-hidden="true" />
            </Button>
          ) : (
            <DrawerClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="-ml-2 size-9"
                aria-label="Close authentication drawer"
              >
                <ArrowLeft className="size-5" aria-hidden="true" />
              </Button>
            </DrawerClose>
          )}

          {/* Icon and title */}
          <div className="flex flex-row gap-2 items-center">
            <Image
              src={icon}
              alt={`${title} icon`}
              width={32}
              height={32}
              className="h-auto w-8"
            />
            <DrawerTitle>{title}</DrawerTitle>
          </div>
        </DrawerHeader>

        <div className="no-scrollbar overflow-y-auto py-12 px-4">
          {isTermsView ? (
            <div className="px-4">
              <TermsAndPrivacy />
            </div>
          ) : (
            <AuthLayout
              title={authModeContent.title}
              subtitle={authModeContent.subtitle}
              mainClassName="min-h-0 px-0 py-0"
              footer={
                <>
                  {authModeContent.footerText}{" "}
                  <Button
                    type="button"
                    variant="link"
                    className="h-auto p-0 text-sm font-semibold text-primary"
                    onClick={() => setAuthMode(authModeContent.nextMode)}
                  >
                    {authModeContent.footerAction}
                  </Button>
                </>
              }
            >
              {authMode === "sign-up" ? (
                <SignUpForm onTermsClick={() => setAuthMode("terms")} />
              ) : (
                <SignInForm />
              )}
            </AuthLayout>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function PersonalDetailsCard() {
  return (
    <Card className="w-full py-4 flex flex-col gap-8 border-0 shadow-none">
      <CardHeader className="flex gap-4 px-0 items-center">
        {/* Title */}
        <div className="flex size-8 items-center justify-center rounded-full bg-primary text-lg font-semibold text-card">
          1
        </div>

        <CardTitle className="text-lg font-semibold">
          Personal Details
        </CardTitle>
      </CardHeader>

      {/* Social Login */}
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
        <p className="text-sm font-semibold">Continue with:</p>

        <div className="flex flex-wrap gap-3">
          <SocialAuthButton
            provider="Google"
            icon={<FaGoogle className="text-primary size-6" />}
            className="bg-background text-muted-foreground hover:bg-transparent"
            onClick={() => console.log("Google login")}
          />

          <SocialAuthButton
            provider="Apple ID"
            icon={<FaApple className="text-card size-6" />}
            className="bg-foreground text-card hover:bg-foreground hover:text-card"
            onClick={() => console.log("Apple login")}
          />

          <SocialAuthButton
            provider="Facebook"
            icon={<FaFacebook className="text-card size-6" />}
            className="bg-[#1877F2] text-card hover:bg-[#1877F2] hover:text-card"
            onClick={() => console.log("Facebook")}
          />

          <CheckoutAuthDrawer />
        </div>
      </div>

      <CardContent className="px-0">
        <form className="flex flex-wrap justify-start gap-8">
          <FormInputField
            id="first-name"
            label="First Name"
            placeholder="Enter first name"
          />
          <FormInputField
            id="last-name"
            label="Last Name"
            placeholder="Enter last name"
          />
          <FormInputField
            id="email"
            label="Email Address"
            type="email"
            placeholder="Enter email address"
          />
          <div className="w-full max-w-104 flex flex-col gap-1 text-muted-foreground text-xs font-medium">
            <Label htmlFor="phone">Phone Number</Label>
            <PhoneInput
              id="phone"
              placeholder="Enter phone number"
              className="hover:ring-1 hover:ring-ring hover:ring-offset-2"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
