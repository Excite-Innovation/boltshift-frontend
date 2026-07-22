import Link from "next/link";
import {
  CircleCheckBig,
  KeyRound,
  Mail,
  UserRoundPlus,
} from "lucide-react";

import { Logomark } from "@/components/brand/logomark";
import { Logotype } from "@/components/brand/logotype";
import { CheckYourEmail } from "@/components/password-reset/check-your-email";
import { ForgotPasswordStep } from "@/components/password-reset/forgot-password";
import { cn } from "@/lib/utils";

type PasswordResetStep = 1 | 2;

type PasswordResetFlowProps = {
  step?: PasswordResetStep;
  email?: string;
};

const sidebarSteps = [
  {
    title: "Forgot Password?",
    description: "We'll send you reset instructions.",
    icon: KeyRound,
  },
  {
    title: "Check your email",
    description: "We sent a password reset link to your email",
    icon: Mail,
  },
  {
    title: "Set new password",
    description:
      "Your new password must be different to previously used passwords.",
    icon: UserRoundPlus,
  },
  {
    title: "Password reset",
    description:
      "Your password has been successfully reset. Click below to log in magically.",
    icon: CircleCheckBig,
  },
] as const;

function PasswordResetSidebar({ step }: { step: PasswordResetStep }) {
  const activeIndex = step - 1;

  return (
    <aside className="bg-muted-foreground/5 pr-4 pl-12 pt-12 flex flex-col gap-20">
      <Link href="/" className="inline-flex items-center gap-3">
        <Logomark className="size-10" aria-hidden="true" />
        <Logotype className="h-6 w-28" aria-hidden="true" />
        <span className="sr-only">Boltshift home</span>
      </Link>

      <div className="grid gap-8">
        {sidebarSteps.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === activeIndex;

          return (
            <div key={item.title} className="relative flex gap-4">
              {index < sidebarSteps.length - 1 ? (
                <span className="absolute left-6 top-12 h-8 w-px bg-border" />
              ) : null}

              <div
                className={cn(
                  "h-12 w-12 flex shrink-0 items-center justify-center rounded-xl border bg-background shadow-sm",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                <Icon className="size-4.5" aria-hidden="true" />
              </div>

              <div className="grid gap-0.5 text-base">
                <p
                  className={cn(
                    "font-semibold",
                    isActive ? "text-foreground/90" : "text-muted-foreground",
                  )}
                >
                  {item.title}
                </p>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export function PasswordResetFlow({
  step = 1,
  email = "",
}: PasswordResetFlowProps = {}) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-[calc(100vh-2rem)] overflow-hidden rounded-[2px] border border-[#ececf2] bg-background lg:grid-cols-[30rem_minmax(0,1fr)]">
        <PasswordResetSidebar step={step} />

        {step === 1 ? (
          <ForgotPasswordStep defaultEmail={email} />
        ) : (
          <CheckYourEmail email={email} />
        )}
      </div>
    </main>
  );
}
