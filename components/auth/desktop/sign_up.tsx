"use client";

import Link from "next/link";

import { SignUpForm, signUpAuthCopy } from "@/components/auth/mobile/sign_up";
import { StartRating } from "@/components/rating/rating";
import { Logomark } from "@/components/brand/logomark";
import { Logotype } from "@/components/brand/logotype";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";

const testimonial = {
  quote: "🌟 Embark on a Brand Odyssey in Our Exquisite Catalog! 🛍️",
  stats: "from Million+ shoppers",
  phrase: "Sign up for free, no credit card needed.",
  rating: 5,
};

function CustomersAvatar() {
  return (
    <AvatarGroup>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src="https://github.com/evilrabbit.png"
          alt="@evilrabbit"
        />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  );
}

function TestimonialCard() {
  return (
    <div className="w-full rounded-3xl border border-border/50 p-12 text-background backdrop-blur-xl grid gap-4">
      <p className="text-4xl font-semibold">"{testimonial.quote}"</p>

      <div className="flex flex-col gap-8">
        <p className="text-2xl font-medium">{testimonial.phrase}</p>
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <StartRating id="client-testimony" value={5} readonly />
              <p className="text-lg font-semibold">5.0</p>
            </div>
            <p className="text-lg font-semi-bold">{testimonial.stats}</p>
          </div>

          <CustomersAvatar />
        </div>
      </div>
    </div>
  );
}

function DesktopHero() {
  return (
    <div className="relative flex h-full w-full overflow-hidden rounded-3xl bg-background p-20">
      <img
        src="/auth/sign_up_image.jpg"
        alt="Happy shoppers planning their purchases together"
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
        decoding="async"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_51.56%,#DA154D_100%)]" />

      <div className="relative z-10 mt-auto w-full">
        <TestimonialCard />
      </div>
    </div>
  );
}

function DesktopAuthPanel() {
  return (
    <div className="flex h-full flex-col justify-center px-2 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-90 grid gap-8">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="flex items-center gap-2">
            <Logomark className="size-11" aria-hidden="true" />
            <Logotype className="h-6 w-32" aria-hidden="true" />
            <span className="sr-only">Boltshift home</span>
          </Link>
        </div>

        <div>
          <div className="grid gap-3 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              {signUpAuthCopy.title}
            </h1>
            <p className="text-base text-muted-foreground">
              {signUpAuthCopy.subtitle}
            </p>
          </div>

          <div className="mt-6">
            <SignUpForm />
          </div>
        </div>

        <p className="text-muted-foreground text-center">
          Don&apos;t have an account?{" "}
          <Link href="/sign-in" className="font-semibold text-primary">
            Sign in
          </Link>
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center text-base font-semibold text-muted-foreground transition-colors hover:text-primary"
        >
          Continue as Guest
        </Link>
      </div>
    </div>
  );
}

export function SignUpDesktop() {
  return (
    <div className="h-screen bg-background p-12">
      <div className="grid h-full w-full lg:grid-cols-2">
        <DesktopHero />
        <DesktopAuthPanel />
      </div>
    </div>
  );
}
