"use client";

import { Logo } from "@/components/brand/logo";
import { useTheme } from "next-themes";
import {
  FaDribbble,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import {
  AppStoreButton,
  GalaxyStoreButton,
  GooglePlayButton,
} from "@/components/app-store/app-store-buttons";
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

// External profiles are centralized so icon rendering stays declarative.
const socialLinks = {
  dribbble: "",
  instagram: "https://www.instagram.com/excitecompany",
  linkedin: "https://www.linkedin.com/company/exciteinnovation",
  github: "https://github.com/Excite-Innovation",
  youtube: "https://www.youtube.com/@ExciteInnovation",
  twitter: "https://www.twitter.com/excitecompany",
};

export function Footer() {
  return (
    <div className="w-full pb-12 flex flex-col gap-8">
      {/* Brand + app distribution CTA. */}
      <div className="pt-4 flex justify-between items-center">
        <Logo />
        <MobileAppButtons />
      </div>

      <div className="flex flex-col gap-12">
        <div className="flex flex-wrap justify-center gap-8 text-muted-foreground">
          {links.map((pathname) => (
            <Link key={pathname} href="#" className="text-base font-medium">
              {pathname}
            </Link>
          ))}
        </div>

        {/* Icon row intentionally uses direct links to avoid extra abstraction around simple external targets. */}
        <div className="h-6 flex gap-6 justify-center">
          <Link href={socialLinks.dribbble} target="_blank">
            <FaDribbble className="text-2xl text-muted-foreground hover:text-foreground hover:cursor-pointer" />
          </Link>

          <Link href={socialLinks.instagram} target="_blank">
            <FaInstagram className="text-2xl text-muted-foreground hover:text-foreground hover:cursor-pointer" />
          </Link>

          <Link href={socialLinks.linkedin} target="_blank">
            <FaLinkedin className="text-2xl text-muted-foreground hover:text-foreground hover:cursor-pointer" />
          </Link>

          <Link href={socialLinks.github} target="_blank">
            <FaGithub className="text-2xl text-muted-foreground hover:text-foreground hover:cursor-pointer" />
          </Link>

          <Link href={socialLinks.youtube} target="_blank">
            <FaYoutube className="text-2xl text-muted-foreground hover:text-foreground hover:cursor-pointer" />
          </Link>

          <Link href={socialLinks.twitter} target="_blank">
            <FaXTwitter className="text-2xl text-muted-foreground hover:text-foreground hover:cursor-pointer" />
          </Link>
        </div>
      </div>
      <div className="pt-4 border-t border-border text-muted-foreground">
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
      <AppStoreButton size="md" className="" />
      <GooglePlayButton size="md" className="" />
    </div>
  );
};
