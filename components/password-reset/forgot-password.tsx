import Link from "next/link";
import { ArrowLeft, KeyRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordResetFooter } from "@/components/password-reset/password-reset-footer";
import { PasswordResetProgress } from "@/components/password-reset/password-reset-progress";

type ForgotPasswordProps = {
  defaultEmail?: string;
  onSubmit?: () => void;
};

export function ForgotPasswordStep({
  defaultEmail = "",
  onSubmit,
}: ForgotPasswordProps = {}) {
  return (
    <section className="m-auto flex w-84 flex-col gap-20 text-foreground">
      <Card className="gap-8 border-0 bg-transparent p-0 shadow-none">
        <CardHeader className="items-center justify-center gap-6 p-0 text-center">
          <div className="m-auto flex h-14 w-14 items-center justify-center rounded-full text-primary">
            <KeyRound size={28} />
          </div>

          <div className="grid gap-3">
            <CardTitle className="text-3xl font-semibold">
              Forgot password?
            </CardTitle>

            <CardDescription className="text-base">
              We&apos;ll send you reset instructions.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <form
            className="grid gap-6"
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit?.();
            }}
          >
            <div className="grid gap-1">
              <Label htmlFor="email" className="text-xs font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue={defaultEmail}
                autoComplete="email"
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              Reset password
            </Button>
          </form>
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

      <PasswordResetProgress step={1} />

      <PasswordResetFooter className="mt-auto px-10" />
    </section>
  );
}
