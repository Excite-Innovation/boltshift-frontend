"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { SignInForm, signInAuthCopy } from "@/components/auth/mobile/sign_in";
import { StartRating } from "@/components/rating/rating";
import { Logomark } from "@/components/brand/logomark";
import { Logotype } from "@/components/brand/logotype";

const testimonial = {
  quote:
    "Exceptional tracking and communication makes planning around our busy schedules a breeze.",
  author: "Marion & Paul Mbingu",
  group: "Couples",
  segment: "Weekly Shoppers",
  rating: 5,
};

function TestimonialCard() {
  return (
    <div className="absolute inset-x-4 bottom-4 z-10 rounded-3xl border border-border/50 p-12 text-background backdrop-blur-xl grid gap-8 sm:inset-x-6 sm:bottom-6 sm:p-6 lg:right-8">
      <p className="text-4xl font-semibold">"{testimonial.quote}"</p>

      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-medium">{testimonial.author}</p>
          <StartRating id="client-testimony" value={5} readonly />
        </div>

        <div className="text-right">
          <p className="text-lg font-semibold">{testimonial.group}</p>
          <p className="text-white/80 text-sm">{testimonial.segment}</p>
        </div>
      </div>
    </div>
  );
}

function DesktopHero() {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-3xl bg-background">
      <Image
        src="/auth/sign_in_Image.jpg"
        alt="Happy shoppers planning their purchases together"
        fill
        priority
        className="object-cover object-center"
        sizes="(min-width: 1024px) 58vw, 100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#da154d]/70 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/10 via-transparent to-transparent" />

      <TestimonialCard />
    </div>
  );
}

function DesktopAuthPanel() {
  return (
    <div className="flex h-full flex-col justify-center px-2 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-84">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="flex items-center gap-2">
            <Logomark className="size-11" aria-hidden="true" />
            <Logotype className="h-6 w-32" aria-hidden="true" />
            <span className="sr-only">Boltshift home</span>
          </Link>

          <div className="mt-8 space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              {signInAuthCopy.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {signInAuthCopy.subtitle}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <SignInForm />
        </div>

        <div className="mt-6 space-y-4 text-center text-sm">
          <p className="text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="font-semibold text-primary">
              Sign up
            </Link>
          </p>

          <Link
            href="/"
            className="inline-flex items-center justify-center text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            Continue as Guest
          </Link>
        </div>
      </div>
    </div>
  );
}

export function SignInDesktop() {
  return (
    <main className="h-screen bg-background p-12">
      <div className="grid h-full w-full lg:grid-cols-2">
        <DesktopHero />
        <DesktopAuthPanel />
      </div>
    </main>
  );
}
