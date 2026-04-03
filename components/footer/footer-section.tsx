"use client";

import { Logo } from "@/components/brand/logo";
import { useTheme } from "next-themes";
import {
  Dribbble,
  Instagram,
  GitHub,
  YouTube,
  X,
} from "@/components/footer/socials";
import { GooglePlayButton, AppStoreButton } from "react-mobile-app-button";
import Link from "next/link";

const links = [
  "Overview",
  "Features",
  "Blog",
  "Pricing",
  "Support",
  "FAQs",
  "Privacy",
  "Ts & Cs",
  "Legal",
  "Team",
  "Careers",
  "Resources",
];

export function Footer() {
  return (
    <div className="w-full pb-12 flex flex-col gap-8">
      <div className="pt-4 flex justify-between items-center">
        <Logo />
        <MobileAppButtons />
      </div>

      <div className="flex flex-col gap-12">
        <div className="flex flex-wrap justify-center gap-8">
          {links.map((pathname) => (
            <Link key={pathname} href="#" className="text-base font-medium">
              {pathname}
            </Link>
          ))}
        </div>
        <div className="h-6 flex gap-6 justify-center">
          <Dribbble />
          <Instagram />
          <GitHub />
          <YouTube />
          <X />
        </div>
      </div>
      <div className="pt-4 border-t border-border">
        <p className="text-xs text-center">
          © 2010 - 2024 Paul Mbingu and/or Excite! Innovation Company. All
          rights reserved. All other trademarks, service marks, and company
          names are the property of their respective owners.{" "}
          <span className="font-semibold">Excite! Innovation Company</span> is a
          Premier Digital Product Innovation Company that specializes in UIUX
          Research, Design & Software Engineering. Boltshift is an intellectual
          property designed & built by{" "}
          <span className="font-semibold">Paul Mbingu</span> for Excite!
          Innovation Company. Special thanks to{" "}
          <span className="font-semibold">
            Senje's Cuisines, Marion Ngayi, Mercy Mbingu, and Kombo Mwanake
          </span>
          .
        </p>
      </div>
    </div>
  );
}

export const MobileAppButtons = () => {
  const { theme } = useTheme();

  const APKUrl = "https://play.google.com/store/apps";
  const IOSUrl = "https://apps.apple.com/us/app";

  const isDark = theme === "dark";

  return (
    <div className="flex flex-col gap-1">
      <AppStoreButton
        url={IOSUrl}
        theme={isDark ? "light" : "dark"}
        className="border-2 border-border"
      />

      <GooglePlayButton
        url={APKUrl}
        theme={isDark ? "light" : "dark"}
        className="p-0 border-2 border-border shrink-0 whitespace-nowrap gap-1"
      />
    </div>
  );
};
