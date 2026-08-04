import * as React from "react";

import { Img, Link, Section } from "react-email";

function assetUrl(siteUrl: string, path: string) {
  return path.startsWith("http") ? path : new URL(path, siteUrl).toString();
}

type EmailLogoProps = {
  siteUrl?: string;
  href?: string;
  alt?: string;
  width?: number;
  height?: number;
  align?: "left" | "center";
  paddingBottom?: number;
};

export function EmailLogo({
  siteUrl = "http://localhost:3000",
  href,
  alt = "Boltshift",
  width = 180,
  height = 36,
  align = "center",
  paddingBottom = 0,
}: EmailLogoProps) {
  const logoSrc = assetUrl(siteUrl, "/email/Brand_Logo.svg");

  return (
    <Section
      style={{
        paddingBottom,
        textAlign: align,
      }}
    >
      {href ? (
        <Link href={href} style={{ display: "inline-block" }}>
          <Img
            src={logoSrc}
            width={String(width)}
            height={String(height)}
            alt={alt}
            style={{ display: "block", margin: "0 auto" }}
          />
        </Link>
      ) : (
        <Img
          src={logoSrc}
          width={String(width)}
          height={String(height)}
          alt={alt}
          style={{ display: "block", margin: "0 auto" }}
        />
      )}
    </Section>
  );
}
