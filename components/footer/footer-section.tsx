"use client";

import { Logo } from "@/components/brand/logo";
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
import { Button } from "../ui/button";
import { useTheme } from "@/components/theme-provider";
import { getCurrentYear } from "@/lib/utils";

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
        <div className="grid grid-cols-4 justify-items-start gap-4 text-muted-foreground sm:grid-cols-[repeat(auto-fit,minmax(4rem,1fr))] sm:gap-8 lg:justify-items-center">
          {links.map((pathname) => (
            <Link
              key={pathname}
              href="#"
              className="text-base font-medium text-center"
            >
              {pathname}
            </Link>
          ))}
        </div>

        {/* Icon row intentionally uses direct links to avoid extra abstraction around simple external targets. */}
        <div className="h-6 flex gap-6 justify-center">
          <SocialIconButton
            href={socialLinks.dribbble}
            icon={<FaDribbble className="text-2xl" />}
            label="Dribbble icon"
          />

          <SocialIconButton
            href={socialLinks.instagram}
            icon={<FaInstagram className="text-2xl" />}
            label="Instagram icon"
          />

          <SocialIconButton
            href={socialLinks.linkedin}
            icon={<FaLinkedin className="text-2xl" />}
            label="Linkedin icon"
          />

          <SocialIconButton
            href={socialLinks.github}
            icon={<FaGithub className="text-2xl" />}
            label="GitHub icon"
          />

          <SocialIconButton
            href={socialLinks.youtube}
            icon={<FaYoutube className="text-2xl" />}
            label="YouTube icon"
          />

          <SocialIconButton
            href={socialLinks.twitter}
            icon={<FaXTwitter className="text-2xl" />}
            label="Twitter icon"
          />
        </div>
      </div>
      <div className="pt-4 border-t border-border text-muted-foreground">
        <p className="text-xs text-center">
          © 2010 - {getCurrentYear()} Paul Mbingu and/or Excite! Innovation
          Company. All rights reserved. All other trademarks, service marks, and
          company names are the property of their respective owners.{" "}
          <Link
            href="https://www.linkedin.com/company/exciteinnovation"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold transition-colors hover:text-foreground"
          >
            Excite! Innovation Company
          </Link> is a
          Premier Digital Product Innovation Company that specializes in UIUX
          Research, Design & Software Engineering. Boltshift is an intellectual
          property designed & built by{" "}
          <Link
            href="https://www.linkedin.com/in/paulxmbingu/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold transition-colors hover:text-foreground"
          >
            Paul Mbingu
          </Link> for Excite!
          Innovation Company. Special thanks to{" "}
          <Link
            href="https://www.linkedin.com/in/denil-anyonyi/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold transition-colors hover:text-foreground"
          >
            Denil Anyonyi
          </Link>
          ,{" "}
          <Link
            href="https://www.linkedin.com/in/adamswonder/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold transition-colors hover:text-foreground"
          >
            Wonder Adams
          </Link>
          ,{" "}
          <Link
            href="https://www.linkedin.com/in/pauline-wanjiku-669500205/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold transition-colors hover:text-foreground"
          >
            Pauline Wanjiru
          </Link>
          , and{" "}
          <Link
            href="https://www.linkedin.com/in/andrew-muatha-6a61421b9/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold transition-colors hover:text-foreground"
          >
            Andrew Muatha
          </Link>
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

type SocialIconButtonProps = {
  href: string;
  icon: React.ReactNode;
  label?: string;
};

// Social icons reusable component
function SocialIconButton({
  href,
  icon,
  label = "social link",
}: SocialIconButtonProps) {
  const handleClick = () => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      aria-label={label}
      asChild
      className="w-6 h-6 text-muted-foreground hover:text-foreground hover:cursor-pointer"
    >
      {icon}
    </Button>
  );
}
