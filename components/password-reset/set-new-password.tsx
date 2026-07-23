import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  RectangleEllipsis,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PasswordResetFooter } from "@/components/password-reset/password-reset-footer";
import { PasswordResetProgress } from "@/components/password-reset/password-reset-progress";

type SetNewPasswordProps = {
  onSubmit?: () => void;
};

const passwordRequirements = [
  {
    label: "Must be at least 8 characters",
    met: false,
  },
  {
    label: "Must be a combination of uppercase & lowercase letters",
    met: true,
  },
  {
    label: "Must include numbers",
    met: false,
  },
  {
    label: "Must contain at least one special character (e.g., !, @, #, $, %)",
    met: true,
  },
] as const;

export function SetNewPassword({ onSubmit }: SetNewPasswordProps = {}) {
  return (
    <section className="m-auto flex max-w-84 flex-col gap-20 text-foreground sm:w-84">
      <Card className="gap-8 border-0 bg-transparent p-0 shadow-none">
        <CardHeader className="items-center justify-center gap-6 p-0 text-center">
          <div className="m-auto flex h-14 w-14 items-center justify-center rounded-full text-primary">
            <RectangleEllipsis size={28} />
          </div>

          <div className="grid gap-3">
            <CardTitle className="text-3xl font-semibold">
              Set new password
            </CardTitle>

            <CardDescription className="text-base">
              Your new password must be different to previously used passwords.
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
              <Label htmlFor="password" className="text-xs font-medium">
                Password
              </Label>
              <Input id="password" name="password" type="password" required />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="retype-password" className="text-xs font-medium">
                Retype Password
              </Label>
              <Input
                id="retype-password"
                name="retype-password"
                type="password"
                required
              />
            </div>

            <ul className="grid gap-3 pt-1">
              {passwordRequirements.map((requirement) => {
                const Icon = requirement.met ? CheckCircle2 : Circle;

                return (
                  <li
                    key={requirement.label}
                    className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"
                  >
                    <Icon
                      className={
                        requirement.met
                          ? "mt-0.5 size-5 shrink-0 text-emerald-600"
                          : "mt-0.5 size-5 shrink-0 text-muted-foreground/60"
                      }
                      aria-hidden="true"
                    />
                    <span className="min-w-0">{requirement.label}</span>
                  </li>
                );
              })}
            </ul>

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

      <PasswordResetProgress step={3} />

      <PasswordResetFooter className="mt-auto px-10" />
    </section>
  );
}
