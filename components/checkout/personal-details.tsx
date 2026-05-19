"use client";

import { Mail } from "lucide-react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SocialAuthButton } from "@/components/checkout/SocialAuthButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function PersonalDetailsCard() {
  return (
    <Card className="w-full py-4 flex flex-col gap-8 shadow-none">
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
        <form className="grid gap-8 md:grid-cols-2">
          {/* First Name */}
          <div className="flex flex-col gap-1 text-muted-foreground text-xs font-medium">
            <Label htmlFor="first-name">First Name</Label>

            <Input
              id="first-name"
              placeholder="Enter first name"
              className="hover:ring-1 hover:ring-ring hover:ring-offset-2"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-1 text-muted-foreground text-xs font-medium">
            <Label htmlFor="last-name">Last Name</Label>

            <Input
              id="last-name"
              placeholder="Enter last name"
              className="hover:ring-1 hover:ring-ring hover:ring-offset-2"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1 text-muted-foreground text-xs font-medium">
            <Label htmlFor="email">Email Address</Label>

            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              className="hover:ring-1 hover:ring-ring hover:ring-offset-2"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1 text-muted-foreground text-xs font-medium">
            <Label htmlFor="phone">Phone Number</Label>

            <Input
              id="phone"
              type="tel"
              placeholder="Enter phone number"
              className="hover:ring-1 hover:ring-ring hover:ring-offset-2"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
