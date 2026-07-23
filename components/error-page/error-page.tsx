"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

import { Footer } from "@/components/footer/footer-section";
import { Navbar, NavbarMobile } from "@/components/navigation/navbar";
import { Button } from "@/components/ui/button";

import {
  errorCopy,
  type ErrorVariant,
} from "@/components/error-page/error-page-data";

type ErrorPageBodyProps = {
  variant?: ErrorVariant;
  embedded?: boolean;
  primaryAction?: ReactNode;
};

type ErrorPageViewProps = {
  variant?: ErrorVariant;
  showChrome?: boolean;
  primaryAction?: ReactNode;
};

function ErrorPageBody({
  variant = "404",
  embedded = false,
  primaryAction,
}: ErrorPageBodyProps) {
  const copy = errorCopy[variant];

  return (
    <main
      className={`relative flex items-center overflow-hidden lg:py-8 ${
        embedded ? "flex-1" : "min-h-screen"
      }`}
    >
      <section className="relative mx-auto flex flex-col w-full items-center gap-12 lg:flex-row lg:gap-0">
        <div className="order-1 flex w-full flex-col gap-8 lg:order-none lg:max-w-none">
          <div className="grid gap-4">
            <div className="grid gap-3">
              <p className="text-base font-semibold text-primary">
                {copy.eyebrow}
              </p>
              <h1 className="text-4xl font-semibold text-primary sm:text-5xl">
                {copy.title}
              </h1>
            </div>

            <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              {copy.description}
            </p>
          </div>

          <div className="w-full sm:w-auto">
            {primaryAction ?? (
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href={copy.href}>
                  <ArrowLeft className="size-4" />
                  {copy.cta}
                </Link>
              </Button>
            )}
          </div>
        </div>

        <div className="order-2 flex w-full items-center justify-center lg:order-none">
          <div className="relative w-117">
            <Image
              src="/error-page/error_page_img.png"
              alt="A shopper sitting on a bean bag with floating question marks"
              width={469}
              height={482}
              priority
              className="h-auto w-full"
              sizes="(min-width: 1024px) 28rem, 100vw"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export function ErrorPageView({
  variant = "404",
  showChrome = true,
  primaryAction,
}: ErrorPageViewProps) {
  if (!showChrome) {
    return <ErrorPageBody variant={variant} primaryAction={primaryAction} />;
  }

  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <div className="hidden md:block">
        <Navbar />
      </div>

      <div className="block md:hidden">
        <NavbarMobile showFilterButton={false} />
      </div>

      <ErrorPageBody
        variant={variant}
        embedded
        primaryAction={primaryAction}
      />

      <Footer />
    </div>
  );
}
