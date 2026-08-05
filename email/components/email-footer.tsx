import * as React from "react";

import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Column, Link, Row, Section, Text } from "react-email";

import { EmailLogo } from "@/email/components/email-logo";

type SocialLinks = {
  twitter?: string;
  facebook?: string;
  instagram?: string;
};

type EmailFooterProps = {
  siteUrl?: string;
  brandHref?: string;
  supportEmail?: string;
  supportPhone?: string;
  companyName?: string;
  companyAddress?: string;
  copyrightText?: string;
  socialLinks?: SocialLinks;
};

function SocialIcon({
  href,
  label,
  children,
}: {
  href?: string;
  label: string;
  children: React.ReactNode;
}) {
  if (!href) {
    return null;
  }

  return (
    <Link
      href={href}
      aria-label={label}
      style={{ display: "inline-flex", lineHeight: 0, textDecoration: "none" }}
    >
      {children}
    </Link>
  );
}

export function EmailFooter({
  siteUrl = "http://localhost:3000",
  brandHref,
  supportEmail,
  supportPhone,
  companyName = "Boltshift",
  companyAddress,
  copyrightText,
  socialLinks,
}: EmailFooterProps) {
  return (
    <Section style={{ paddingTop: 24 }}>
      {supportEmail || supportPhone || companyAddress || copyrightText ? (
        <Section style={{ paddingBottom: 24 }}>
          {supportEmail ? (
            <Text
              style={{
                margin: "0 0 8px",
                fontSize: 14,
                lineHeight: "20px",
                color: "#475467",
              }}
            >
              If you need assistance, please contact our support team at{" "}
              <Link
                href={`mailto:${supportEmail}`}
                style={{ color: "#475467", textDecoration: "underline" }}
              >
                {supportEmail}
              </Link>
              {supportPhone ? (
                <>
                  {" "}
                  or{" "}
                  <Link
                    href={`tel:${supportPhone.replace(/[^+\d]/g, "")}`}
                    style={{ color: "#475467", textDecoration: "underline" }}
                  >
                    {supportPhone}
                  </Link>
                </>
              ) : null}
              .
            </Text>
          ) : null}

          {companyAddress ? (
            <Text
              style={{
                margin: "0 0 8px",
                fontSize: 13,
                lineHeight: "20px",
                color: "#667085",
              }}
            >
              {companyAddress}
            </Text>
          ) : null}

          {copyrightText ? (
            <Text
              style={{
                margin: 0,
                fontSize: 13,
                lineHeight: "20px",
                color: "#667085",
              }}
            >
              {copyrightText}
            </Text>
          ) : null}
        </Section>
      ) : null}

      <Row style={{ width: "100%", verticalAlign: "middle" }}>
        <Column
          style={{ width: "50%", verticalAlign: "middle", padding: 0 }}
        >
          <EmailLogo
            siteUrl={siteUrl}
            href={brandHref}
            width={180}
            height={36}
            align="left"
          />
        </Column>
        <Column
          style={{
            width: "50%",
            verticalAlign: "middle",
            textAlign: "right",
            padding: 0,
          }}
        >
          <Section>
            <SocialIcon
              href={socialLinks?.twitter}
              label={`${companyName} on X`}
            >
              <FaXTwitter size={18} color="#1d9bf0" />
            </SocialIcon>
            <span style={{ display: "inline-block", width: 12 }} />
            <SocialIcon
              href={socialLinks?.facebook}
              label={`${companyName} on Facebook`}
            >
              <FaFacebookF size={18} color="#1877f2" />
            </SocialIcon>
            <span style={{ display: "inline-block", width: 12 }} />
            <SocialIcon
              href={socialLinks?.instagram}
              label={`${companyName} on Instagram`}
            >
              <FaInstagram size={18} color="#111111" />
            </SocialIcon>
          </Section>
        </Column>
      </Row>
    </Section>
  );
}
