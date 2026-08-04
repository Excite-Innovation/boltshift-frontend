import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "react-email";

import { EmailCard } from "@/email/email-card";
import { EmailFooter } from "@/email/email-footer";
import { EmailLogo } from "@/email/email-logo";

type ResetPasswordEmailProps = {
  firstName?: string;
  resetUrl?: string;
  siteUrl?: string;
  supportEmail?: string;
  supportPhone?: string;
  helpCenterUrl?: string;
  companyAddress?: string;
};

function getAbsoluteUrl(siteUrl: string, url: string) {
  return url.startsWith("http") ? url : new URL(url, siteUrl).toString();
}

export function ResetPasswordEmail({
  firstName = "",
  resetUrl = "/forgot-password",
  siteUrl = "http://localhost:3000",
  supportEmail = "help@boltshift.com",
  supportPhone = "+254 700 111 111",
  helpCenterUrl = "/help",
  companyAddress = "Block F Neema Court, Ngong Rd Nairobi",
}: ResetPasswordEmailProps) {
  const absoluteResetUrl = getAbsoluteUrl(siteUrl, resetUrl);
  const absoluteHelpCenterUrl = getAbsoluteUrl(siteUrl, helpCenterUrl);
  const wrapTextStyle = {
    wordBreak: "break-word",
    overflowWrap: "anywhere",
    whiteSpace: "normal",
  } as const;

  return (
    <Html lang="en">
      <Head />
      <Preview>
        Password reset instructions for your Boltshift account.
      </Preview>
      <Body
        style={{
          margin: 0,
          padding: "24px 0",
          backgroundColor: "#f7f8fc",
          fontFamily: "sans-serif",
        }}
      >
        <Container
          style={{
            width: "100%",
            maxWidth: 640,
            margin: "0 auto",
          }}
        >
          <EmailCard
            style={{
              width: "100%",
              border: "1px solid #e5e7eb",
              borderRadius: 24,
              padding: "40px 24px 28px",
              backgroundColor: "#ffffff",
            }}
          >
            <EmailLogo siteUrl={siteUrl} />

            <Section style={{ padding: "8px 0 0" }}>
              <Heading
                style={{
                  margin: "0 0 28px",
                  fontSize: 30,
                  lineHeight: "38px",
                  color: "#475467",
                  fontWeight: 600,
                  textAlign: "left",
                  ...wrapTextStyle,
                }}
              >
                Password Reset Instructions
              </Heading>

              <Text
                style={{
                  margin: "0 0 20px",
                  fontSize: 16,
                  lineHeight: "24px",
                  color: "#475467",
                  ...wrapTextStyle,
                }}
              >
                Dear {firstName || "user"}
              </Text>

              <Text
                style={{
                  margin: "0 0 20px",
                  fontSize: 16,
                  lineHeight: "24px",
                  color: "#475467",
                  ...wrapTextStyle,
                }}
              >
                We have received a request to reset the password for your
                account. To proceed with resetting your password, please follow
                the instructions below:
              </Text>

              <Text
                style={{
                  margin: "0 0 8px",
                  fontSize: 16,
                  lineHeight: "24px",
                  color: "#475467",
                  ...wrapTextStyle,
                }}
              >
                1. Click on the{" "}
                <strong style={{ color: "#101828" }}>Reset Password</strong>{" "}
                button below.
              </Text>

              <Text
                style={{
                  margin: "0 0 28px",
                  fontSize: 16,
                  lineHeight: "24px",
                  color: "#475467",
                  ...wrapTextStyle,
                }}
              >
                2. You will be directed to a page where you can create a new
                password for your account.
              </Text>

              <Button
                href={absoluteResetUrl}
                style={{
                  display: "inline-block",
                  backgroundColor: "#EE2255",
                  color: "#ffffff",
                  borderRadius: 8,
                  fontSize: 15,
                  lineHeight: "22px",
                  fontWeight: 700,
                  padding: "12px 18px",
                  textDecoration: "none",
                }}
              >
                Reset Password
              </Button>

              <Text
                style={{
                  margin: "28px 0 0",
                  fontSize: 16,
                  lineHeight: "24px",
                  color: "#475467",
                  ...wrapTextStyle,
                }}
              >
                Thanks,
                <br />
                Boltshift Team
              </Text>

              <Text
                style={{
                  margin: "28px 0 0",
                  fontSize: 13,
                  lineHeight: "20px",
                  color: "#667085",
                  ...wrapTextStyle,
                }}
              >
                If you did not request a password reset, please ignore this
                email. Your account is secure, and no changes have been made.
              </Text>

              <Text
                style={{
                  margin: "16px 0 0",
                  fontSize: 13,
                  lineHeight: "20px",
                  color: "#667085",
                  ...wrapTextStyle,
                }}
              >
                Thank you for using Boltshift. If you need further assistance,
                please contact our support team at{" "}
                <Link
                  href={`mailto:${supportEmail}`}
                  style={{ color: "#667085", textDecoration: "underline" }}
                >
                  {supportEmail}
                </Link>{" "}
                or visit our{" "}
                <Link
                  href={absoluteHelpCenterUrl}
                  style={{ color: "#667085", textDecoration: "underline" }}
                >
                  Help Center
                </Link>
                .
              </Text>

              <EmailFooter
                siteUrl={siteUrl}
                supportEmail={supportEmail}
                supportPhone={supportPhone}
                companyAddress={companyAddress}
                copyrightText="© 2023 Excite! Innovation Company, Block F Neema Court, Ngong Rd Nairobi"
                socialLinks={{
                  twitter: "https://twitter.com/excitecompany",
                  facebook: "https://www.facebook.com/",
                  instagram: "https://www.instagram.com/excitecompany",
                }}
              />
            </Section>
          </EmailCard>
        </Container>
      </Body>
    </Html>
  );
}

export default ResetPasswordEmail;
