import * as React from "react";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "react-email";

import { EmailCard } from "./email-card";

type WelcomeProduct = {
  title: string;
  category: string;
  imageSrc: string;
  rating?: string;
  reviewCount?: string;
};

type WelcomeEmailProps = {
  firstName?: string;
  email: string;
  temporaryPassword?: string;
  supportEmail?: string;
  supportPhone?: string;
  loginUrl?: string;
  shopUrl?: string;
  siteUrl?: string;
  products?: WelcomeProduct[];
};

const defaultProducts: WelcomeProduct[] = [
  {
    title: "Contemporary Accent Lamp",
    category: "Home & Living",
    imageSrc: "/account/voucher/Laptop.png",
    rating: "4.8",
    reviewCount: "12.4k reviews",
  },
  {
    title: "Contemporary Accent Watch",
    category: "Accessories",
    imageSrc: "/account/voucher/Watch.png",
    rating: "4.9",
    reviewCount: "9.8k reviews",
  },
  {
    title: "Contemporary Accent Denim",
    category: "Everyday Essentials",
    imageSrc: "/account/voucher/Jeans.png",
    rating: "4.7",
    reviewCount: "8.2k reviews",
  },
];

function StarRating({ value = 5 }: { value?: number }) {
  return (
    <Text
      style={{
        margin: 0,
        fontSize: 14,
        lineHeight: "20px",
        color: "#f59e0b",
        letterSpacing: "0.08em",
      }}
    >
      {"★".repeat(Math.max(0, Math.min(5, value)))}
      {"☆".repeat(Math.max(0, 5 - value))}
    </Text>
  );
}

function LogoBlock({ siteUrl }: { siteUrl: string }) {
  return (
    <Section style={{ textAlign: "center", paddingBottom: 16 }}>
      <Row style={{ width: "100%" }}>
        <Column align="center">
          <table
            role="presentation"
            cellPadding="0"
            cellSpacing="0"
            style={{ margin: "0 auto" }}
          >
            <tbody>
              <tr>
                <td style={{ verticalAlign: "middle", paddingRight: 10 }}>
                  <Img
                    src={`${siteUrl}/icons/standard/icon-192x192.png`}
                    width="36"
                    height="36"
                    alt="Boltshift"
                    style={{
                      display: "block",
                      borderRadius: 9999,
                    }}
                  />
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <Img
                    src={`${siteUrl}/vendor-logos/Boltshift.svg`}
                    width="140"
                    height="28"
                    alt="Boltshift name"
                    style={{ display: "block" }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Column>
      </Row>
    </Section>
  );
}

function ProductCard({
  product,
  siteUrl,
}: {
  product: WelcomeProduct;
  siteUrl: string;
}) {
  return (
    <EmailCard style={{ width: "100%" }}>
      <Img
        src={`${siteUrl}/icons/standard/icon-192x192.png`}
        width="164"
        height="128"
        alt="Boltshift logo"
        style={{
          display: "block",
          width: "100%",
          height: 128,
          objectFit: "contain",
          backgroundColor: "#ffffff",
          padding: 20,
        }}
      />
      <Section style={{ padding: 12 }}>
        <Text
          style={{
            margin: "0 0 4px",
            fontSize: 13,
            lineHeight: "18px",
            fontWeight: 600,
            color: "#111827",
          }}
        >
          {product.title}
        </Text>
        <Text
          style={{
            margin: "0 0 8px",
            fontSize: 12,
            lineHeight: "16px",
            color: "#6b7280",
          }}
        >
          {product.category}
        </Text>
        <StarRating value={5} />
        <Text
          style={{
            margin: "4px 0 0",
            fontSize: 12,
            lineHeight: "16px",
            color: "#6b7280",
          }}
        >
          {product.rating} ({product.reviewCount})
        </Text>
      </Section>
    </EmailCard>
  );
}

export function WelcomeEmail({
  firstName = "there",
  email,
  temporaryPassword = "Passwrd2023#",
  supportEmail = "help@boltshift.com",
  supportPhone = "+254 700 111 111",
  loginUrl = "/sign-in",
  shopUrl = "/catalog",
  siteUrl = "http://localhost:3000",
  products = defaultProducts,
}: WelcomeEmailProps) {
  const absoluteLoginUrl = loginUrl.startsWith("http")
    ? loginUrl
    : `${siteUrl}${loginUrl}`;
  const absoluteShopUrl = shopUrl.startsWith("http")
    ? shopUrl
    : `${siteUrl}${shopUrl}`;

  return (
    <Html lang="en">
      <Head />
      <Preview>
        Welcome to Boltshift, {firstName}. Your account is ready.
      </Preview>
      <Body
        style={{
          margin: 0,
          padding: "24px 0",
          backgroundColor: "#f4f6fb",
          fontFamily:
            'sans-serif',
        }}
      >
        <Container
          style={{
            maxWidth: 640,
            margin: "0 auto",
            border: "1px",
            borderRadius: "24px",
          }}
        >
          <EmailCard
            style={{
              padding: "48px 32px",
              display: "flex",
              gap: "48px",
            }}
          >
            <LogoBlock siteUrl={siteUrl} />
            <Section style={{ padding: "28px 28px 20px" }}>
              <Heading
                style={{
                  fontSize: 30,
                  lineHeight: "38px",
                  color: "#101828",
                  fontWeight: 600,
                  textAlign: "left",
                }}
              >
                Welcome to Boltshift - Let&apos;s Get Started!
              </Heading>

              <Text
                style={{
                  fontSize: 16,
                  lineHeight: "24px",
                  color: "#101828",
                }}
              >
                Welcome to Boltshift, {firstName}. We&apos;re excited to have
                you on board.
                <br />
                <br />
                Get ready to discover an amazing selection of products,
                unbeatable deals, and top-notch service.
                <br />
                <br />
                To start shopping, simply log in using:
              </Text>

              <EmailCard>
                <Text
                  style={{
                    color: "#344054",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "24px",
                  }}
                >
                  Email: {email}
                  <br />
                  Temporary Password: {temporaryPassword}
                </Text>
              </EmailCard>

              <Text
                style={{
                  margin: "16px 0 18px",
                  fontSize: 15,
                  lineHeight: "24px",
                  color: "#374151",
                }}
              >
                Visit{" "}
                <Link
                  href={absoluteShopUrl}
                  style={{ color: "#db134d", textDecoration: "underline" }}
                >
                  boltshift.com
                </Link>{" "}
                now and explore!
              </Text>

              <Text
                style={{
                  margin: "18px 0 0",
                  fontSize: 13,
                  lineHeight: "20px",
                  color: "#4b5563",
                }}
              >
                If you have any questions, our support team is here to help at{" "}
                <Link
                  href={`mailto:${supportEmail}`}
                  style={{ color: "#db134d", textDecoration: "underline" }}
                >
                  {supportEmail}
                </Link>{" "}
                or {supportPhone}
              </Text>

              <Text
                style={{
                  margin: "12px 0 0",
                  fontSize: 15,
                  lineHeight: "24px",
                  color: "#374151",
                }}
              >
                Happy shopping!
                <br />
                Best regards,
                <br />
                The Boltshift Team
              </Text>

              <Text
                style={{
                  margin: "12px 0 0",
                  fontSize: 13,
                  lineHeight: "20px",
                  color: "#6b7280",
                }}
              >
                P.S. Follow us on for updates and more.
              </Text>
            </Section>

            <Section style={{ padding: "0 28px 24px" }}>
              <Hr
                style={{
                  borderColor: "#e5e7eb",
                  margin: "0 0 20px",
                }}
              />

              <Heading
                style={{
                  margin: "0 0 16px",
                  fontSize: 20,
                  lineHeight: "28px",
                  color: "#111827",
                }}
              >
                Hot Deal Today
              </Heading>

              <Row>
                {products.map((product) => (
                  <Column
                    key={product.title}
                    style={{ width: "33.333%", paddingRight: 8 }}
                  >
                    <ProductCard product={product} siteUrl={siteUrl} />
                  </Column>
                ))}
              </Row>
            </Section>

            <Section style={{ padding: "0 28px 28px" }}>
              <EmailCard
                style={{
                  padding: 20,
                  backgroundColor: "#f9fafb",
                  borderRadius: 20,
                }}
              >
                <Heading
                  style={{
                    margin: "0 0 8px",
                    fontSize: 18,
                    lineHeight: "26px",
                    color: "#111827",
                  }}
                >
                  Download the app
                </Heading>
                <Text
                  style={{
                    margin: "0 0 16px",
                    fontSize: 14,
                    lineHeight: "22px",
                    color: "#4b5563",
                  }}
                >
                  Get the most of Boltshift by installing our free mobile app.
                </Text>
                <Row>
                  <Column style={{ paddingRight: 10 }}>
                    <Button
                      href={absoluteShopUrl}
                      style={{
                        backgroundColor: "#111827",
                        borderRadius: 12,
                        color: "#ffffff",
                        fontSize: 13,
                        fontWeight: 700,
                        padding: "12px 16px",
                        textDecoration: "none",
                        display: "inline-block",
                      }}
                    >
                      App Store
                    </Button>
                  </Column>
                  <Column>
                    <Button
                      href={absoluteShopUrl}
                      style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #d1d5db",
                        borderRadius: 12,
                        color: "#111827",
                        fontSize: 13,
                        fontWeight: 700,
                        padding: "12px 16px",
                        textDecoration: "none",
                        display: "inline-block",
                      }}
                    >
                      Google Play
                    </Button>
                  </Column>
                </Row>
              </EmailCard>
            </Section>

            <Section style={{ padding: "0 28px 28px" }}>
              <Text
                style={{
                  margin: 0,
                  fontSize: 12,
                  lineHeight: "18px",
                  color: "#6b7280",
                  textAlign: "center",
                }}
              >
                Thank you for using Boltshift. We appreciate your trust in us
                and are committed to providing you with a secure and reliable
                experience.
              </Text>
              <Text
                style={{
                  margin: "10px 0 0",
                  fontSize: 12,
                  lineHeight: "18px",
                  color: "#9ca3af",
                  textAlign: "center",
                }}
              >
                © 2026 Boltshift. All rights reserved.
              </Text>
            </Section>
          </EmailCard>
        </Container>
      </Body>
    </Html>
  );
}

export default WelcomeEmail;
