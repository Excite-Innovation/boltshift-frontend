import Link from "next/link";
import { ArrowLeft, Mail, PhoneOutgoing, KeyRound } from "lucide-react";

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

const recoveryProgress = [true, false, false, false];

type ForgotPasswordProps = {
  defaultEmail?: string;
};

export function ForgotPassword({
  defaultEmail = "",
}: ForgotPasswordProps = {}) {
  return (
    <main className="text-foreground">
      <section className="flex flex-col gap-20">
        <Card className="border-0 bg-transparent p-0 gap-8 shadow-none">
          <CardHeader className="p-0 text-center gap-6 items-center justify-center">
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
            <form className="grid gap-6">
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

        <div className="flex justify-center gap-2">
          {recoveryProgress.map((active, index) => (
            <span
              key={`${index}-${active ? "active" : "inactive"}`}
              className={[
                "h-1.5 w-7.5 rounded-full",
                active ? "bg-primary" : "bg-muted",
              ].join(" ")}
              aria-hidden="true"
            />
          ))}
        </div>

        <footer className="mt-auto flex flex-col items-center gap-2 px-10 text-sm text-muted-foreground">
          <a
            href="mailto:help@excite.company"
            className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
          >
            <Mail className="size-5" />
            help@excite.company
          </a>

          <a
            href="tel:+254700111111"
            className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
          >
            <PhoneOutgoing className="size-5" />
            +254 700 111 111
          </a>
        </footer>
      </section>
    </main>
  );
}
