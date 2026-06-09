"use client";

import { Mail } from "lucide-react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";

import { SocialAuthButton } from "@/components/checkout/SocialAuthButton";

export function AccountSocialButtons() {
  return (
    <div className="flex gap-2">
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
        className="bg-[#DA154D] text-card hover:bg-[#DA154D] hover:text-card"
        onClick={() => console.log("Email")}
      />
    </div>
  );
}
