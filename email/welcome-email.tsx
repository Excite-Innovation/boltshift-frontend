import * as React from "react";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "react-email";

import { EmailFooter } from "@/email/components/email-footer";
import { EmailLogo } from "@/email/components/email-logo";
import { EmailCard } from "@/email/components/email-card";
import { EditNum } from "@/lib/utils";

type WelcomeProduct = {
  title: string;
  category: string;
  imageSrc: string;
  rating?: string;
  reviewCount?: string;
  price?: number;
};

type WelcomeEmailProps = {
  firstName?: string;
  email: string;
  password?: string;
  supportEmail?: string;
  supportPhone?: string;
  loginUrl?: string;
  shopUrl?: string;
  siteUrl?: string;
  products?: WelcomeProduct[];
  companyAddress?: string;
};

const defaultProducts: WelcomeProduct[] = [
  {
    title: "Contemporary Accent Lamp",
    category: "Home & Living",
    imageSrc:
      "https://i.pinimg.com/736x/a4/ee/14/a4ee14303302dc2e75637b04e42a9b03.jpg",
    rating: "4.8",
    reviewCount: "12.4k reviews",
    price: 54000,
  },
  {
    title: "Contemporary Accent Watch",
    category: "Accessories",
    imageSrc:
      "https://i.pinimg.com/736x/a4/ee/14/a4ee14303302dc2e75637b04e42a9b03.jpg",
    rating: "4.9",
    reviewCount: "9.8k reviews",
    price: 12000,
  },
  {
    title: "Contemporary Accent Denim",
    category: "Everyday Essentials",
    imageSrc:
      "https://i.pinimg.com/736x/a4/ee/14/a4ee14303302dc2e75637b04e42a9b03.jpg",
    rating: "4.7",
    reviewCount: "8.2k reviews",
    price: 45000,
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

function ProductCard({
  product,
  siteUrl,
}: {
  product: WelcomeProduct;
  siteUrl: string;
}) {
  const wrapTextStyle = {
    wordBreak: "break-word",
    overflowWrap: "anywhere",
    whiteSpace: "normal",
  } as const;

  return (
    <EmailCard
      style={{
        width: 160,
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        paddingBottom: 12,
        backgroundColor: "#ffffff",
      }}
    >
      <Img
        src={
          product.imageSrc.startsWith("http")
            ? product.imageSrc
            : new URL(product.imageSrc, siteUrl).toString()
        }
        width="160"
        height="128"
        alt={product.title}
        style={{
          display: "block",
          width: "100%",
          backgroundColor: "#ffffff",
        }}
      />
      <Section style={{ padding: "12px 12px 0" }}>
        <Section>
          <Text
            style={{
              fontSize: 13,
              lineHeight: "18px",
              fontWeight: 600,
              color: "#111827",
              ...wrapTextStyle,
            }}
          >
            {product.title}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 500,
              lineHeight: "18px",
              color: "#DA154D",
            }}
          >
            Ksh.{EditNum(Number(product.price))}
          </Text>
        </Section>
        <StarRating value={Number(product.rating) || 0} />
        <Text
          style={{
            margin: "4px 0 0",
            fontSize: 12,
            lineHeight: "16px",
            color: "#6b7280",
          }}
        >
          ({product.reviewCount})
        </Text>
      </Section>
    </EmailCard>
  );
}

function AppBadge({
  siteUrl,
  src,
  alt,
}: {
  siteUrl: string;
  src: string;
  alt: string;
}) {
  return (
    <Img
      src={src.startsWith("http") ? src : new URL(src, siteUrl).toString()}
      alt={alt}
      width="135"
      height="40"
      style={{ display: "block" }}
    />
  );
}

export function WelcomeEmail({
  firstName = "",
  email,
  password = "",
  supportEmail = "help@boltshift.com",
  supportPhone = "+254 700 111 111",
  loginUrl = "/sign-in",
  shopUrl = "/catalog",
  siteUrl = "http://localhost:3000",
  products = defaultProducts,
  companyAddress = "Block F Neema Court, Ngong Rd Nairobi"
}: WelcomeEmailProps) {
  const absoluteLoginUrl = loginUrl.startsWith("http")
    ? loginUrl
    : `${siteUrl}${loginUrl}`;
  const absoluteShopUrl = shopUrl.startsWith("http")
    ? shopUrl
    : `${siteUrl}${shopUrl}`;
  const wrapTextStyle = {
    wordBreak: "break-word",
    overflowWrap: "anywhere",
    whiteSpace: "normal",
  } as const;

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
              padding: "48px 32px",
              backgroundColor: "#ffffff",
            }}
          >
            <EmailLogo siteUrl={siteUrl} />
            <Section style={{ padding: "0 0 32px" }}>
              <Heading
                style={{
                  fontSize: 30,
                  lineHeight: "38px",
                  color: "#101828",
                  fontWeight: 600,
                  textAlign: "left",
                  ...wrapTextStyle,
                }}
              >
                Welcome to Boltshift - Let&apos;s Get Started!
              </Heading>

              <Text
                style={{
                  fontSize: 16,
                  lineHeight: "24px",
                  color: "#101828",
                  ...wrapTextStyle,
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
                    ...wrapTextStyle,
                  }}
                >
                  Email: {email}
                  <br />
                  Temporary Password: {password}
                  <br />
                  Login:{" "}
                  <Link
                    href={absoluteLoginUrl}
                    style={{ color: "#344054", textDecoration: "underline" }}
                  >
                    Sign in
                  </Link>
                </Text>
              </EmailCard>

              <Text
                style={{
                  color: "#344054",
                  ...wrapTextStyle,
                }}
              >
                Visit{" "}
                <Link
                  href={absoluteShopUrl}
                  style={{ color: "#344054", textDecoration: "underline" }}
                >
                  boltshift.com
                </Link>{" "}
                now and explore!
                <br />
                <br />
                If you have any questions, our support team is here to help at{" "}
                <Link
                  href={`mailto:${supportEmail}`}
                  style={{ color: "#344054", textDecoration: "underline" }}
                >
                  {supportEmail}
                </Link>{" "}
                or{" "}
                <span style={{ textDecoration: "underline" }}>
                  {supportPhone}
                </span>
                <br />
                <br />
                Happy shopping!
                <br />
                <br />
                Best regards,
                <br />
                The Boltshift Team
                <br />
                <br />
                P.S. Follow us on for updates and more.
              </Text>
            </Section>

            <Section style={{ padding: "0 0 16px" }}>
              <Heading
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  lineHeight: "32px",
                  color: "#111827",
                  ...wrapTextStyle,
                }}
              >
                Hot Deal Today
              </Heading>

              <Row style={{ width: "100%" }}>
                {products[0] && (
                  <Column style={{ width: 160, paddingRight: 16 }}>
                    <ProductCard product={products[0]} siteUrl={siteUrl} />
                  </Column>
                )}
                {products[1] && (
                  <Column style={{ width: 160, paddingRight: 16 }}>
                    <ProductCard product={products[1]} siteUrl={siteUrl} />
                  </Column>
                )}
                {products[2] && (
                  <Column style={{ width: 160 }}>
                    <ProductCard product={products[2]} siteUrl={siteUrl} />
                  </Column>
                )}
              </Row>
            </Section>

            <Section style={{ padding: "0 24px" }}>
              <EmailCard>
                <Heading
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    lineHeight: "24px",
                    color: "#101828",
                    ...wrapTextStyle,
                  }}
                >
                  Download the app
                </Heading>
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: "20px",
                    color: "#475467",
                    ...wrapTextStyle,
                  }}
                >
                  Get the most of Boltshift by installing our free mobile app.
                </Text>
                <Row>
                  <Column style={{ paddingRight: 10 }}>
                    <AppBadge
                      siteUrl={siteUrl}
                      src="/email/app_store_badge.png"
                      alt="Download on the App Store"
                    />
                  </Column>
                  <Column>
                    <AppBadge
                      siteUrl={siteUrl}
                      src="/email/play_storebadge.png"
                      alt="Get it on Google Play"
                    />
                  </Column>
                </Row>
              </EmailCard>
              <Section style={{ paddingTop: "48px" }}>
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: "20px",
                    color: "#475467",
                    ...wrapTextStyle,
                  }}
                >
                  Thank you for using Boltshift. We appreciate your trust in us
                  and are committed to providing you with a secure and reliable
                  experience.
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
            </Section>
          </EmailCard>
        </Container>
      </Body>
    </Html>
  );
}

export default WelcomeEmail;
