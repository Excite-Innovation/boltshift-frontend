"use client";

import { Mail } from "lucide-react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SocialAuthButton } from "@/components/checkout/SocialAuthButton";
import { FormInputField } from "@/components/checkout/form-input-field";

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

          <SocialAuthButton
            provider="Email"
            icon={<Mail className="text-card size-6" />}
            className="bg-primary text-card hover:bg-primary hover:text-card"
            onClick={() => console.log("Mail")}
          />
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
          <FormInputField
            id="phone"
            label="Phone Number"
            type="tel"
            placeholder="Enter phone number"
          />
        </form>
      </CardContent>
    </Card>
  );
}
