"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

import { showSonnerMessage } from "@/components/alert/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PasswordResetFooter } from "@/components/password-reset/password-reset-footer";
import { PasswordResetProgress } from "@/components/password-reset/password-reset-progress";

type CheckYourEmailProps = {
  email?: string;
  onSubmit?: () => void;
};

export function CheckYourEmail({
  email = "paul@excite.company",
  onSubmit,
}: CheckYourEmailProps = {}) {
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (hasShownToast.current) {
      return;
    }

    hasShownToast.current = true;

    showSonnerMessage({
      variant: "success",
      title: "Password Reset Email",
      description: `We sent a password reset link to ${email}.`,
      iconSrc: "/sonnar/Email-ring.svg",
    });
  }, [email]);

  return (
    <section className="m-auto flex max-w-84 flex-col gap-20 text-foreground sm:w-84">
      <Card className="gap-8 border-0 bg-transparent p-0 shadow-none">
        <CardHeader className="items-center justify-center gap-6 p-0 text-center">
          <div className="m-auto flex h-14 w-14 items-center justify-center rounded-full bg-background text-primary">
            <Mail className="size-6" />
          </div>

          <div className="grid gap-3">
            <CardTitle className="text-3xl font-semibold">
              Check your email
            </CardTitle>

            <CardDescription className="text-base">
              We sent a password reset link to {email}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="grid gap-8 p-0">
          <Button
            type="button"
            size="lg"
            className="w-full"
            onClick={() => onSubmit?.()}
          >
            Open email app
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Didn&apos;t receive the email?{" "}
            <button type="button" className="font-semibold text-foreground">
              Click to resend
            </button>
          </p>
        </CardContent>

        <Button
          variant="ghost"
          asChild
          className="justify-center text-sm font-semibold text-muted-foreground hover:bg-transparent hover:text-foreground"
        >
          <Link href="/sign-in">
            <ArrowLeft className="size-5" />
            Back to log in
          </Link>
        </Button>
      </Card>

      <PasswordResetProgress step={2} />

      <PasswordResetFooter className="mt-auto px-10" />
    </section>
  );
}
