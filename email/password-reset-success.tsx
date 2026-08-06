import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from "react-email";

import { AppBadge } from "@/email/components/app-badge";
import { EmailCard } from "@/email/components/email-card";
import { EmailFooter } from "@/email/components/email-footer";
import { EmailLogo } from "@/email/components/email-logo";
import {
  ProductCard,
  type WelcomeProduct,
} from "@/email/components/product-card";
import { EMAIL_ASSETS } from "@/email/components/email-assets";

type PasswordResetSuccessEmailProps = {
  firstName?: string;
  siteUrl?: string;
  products?: WelcomeProduct[];
  companyAddress?: string;
};

const defaultProducts: WelcomeProduct[] = [
  {
    title: "Signature Everyday Tote",
    imageSrc: EMAIL_ASSETS.welcomeProductImage,
    rating: "4.8",
    reviewCount: "12.4k reviews",
    price: 54000,
  },
  {
    title: "Minimal Leather Watch",
    imageSrc: EMAIL_ASSETS.welcomeProductImage,
    rating: "4.9",
    reviewCount: "9.8k reviews",
    price: 12000,
  },
  {
    title: "Weekend Denim Jacket",
    imageSrc: EMAIL_ASSETS.welcomeProductImage,
    rating: "4.7",
    reviewCount: "8.2k reviews",
    price: 45000,
  },
];

export function PasswordResetSuccessEmail({
  firstName = "",
  siteUrl = "http://localhost:3000",
  products = defaultProducts,
  companyAddress = "Block F Neema Court, Ngong Rd Nairobi",
}: PasswordResetSuccessEmailProps) {
  const wrapTextStyle = {
    wordBreak: "break-word",
    overflowWrap: "anywhere",
    whiteSpace: "normal",
  } as const;

  return (
    <Html lang="en">
      <Head />
      <Preview>Your Boltshift password has been reset successfully.</Preview>
      <Body
        style={{
          margin: 0,
          padding: "24px 0",
          backgroundColor: "#ffffff",
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

            <Section style={{ padding: "0 0 28px" }}>
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
                Password reset successful
              </Heading>

              <Text
                style={{
                  fontSize: 16,
                  lineHeight: "24px",
                  color: "#101828",
                  ...wrapTextStyle,
                }}
              >
                Hi {firstName || "there"},
                <br />
                <br />
                Your password was changed successfully. You can now sign in with
                your new password and continue shopping with confidence.
              </Text>

              <EmailCard
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 16,
                  padding: "18px 20px",
                  backgroundColor: "#f9fafb",
                }}
              >
                <Text
                  style={{
                    margin: 0,
                    fontSize: 15,
                    lineHeight: "22px",
                    fontWeight: 600,
                    color: "#111827",
                    ...wrapTextStyle,
                  }}
                >
                  Your account is protected and ready to use.
                </Text>
              </EmailCard>

              <Text
                style={{
                  margin: "24px 0 0",
                  fontSize: 16,
                  lineHeight: "24px",
                  color: "#475467",
                  ...wrapTextStyle,
                }}
              >
                Need inspiration for your next order? Here are a few picks we
                think you&apos;ll like.
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
                Popular picks
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
                    margin: "0 0 8px",
                    fontSize: 16,
                    fontWeight: 600,
                    lineHeight: "24px",
                    color: "#101828",
                    ...wrapTextStyle,
                  }}
                >
                  Download the app
                </Heading>
                <Text
                  style={{
                    margin: "0 0 16px",
                    fontSize: 14,
                    lineHeight: "20px",
                    color: "#475467",
                    ...wrapTextStyle,
                  }}
                >
                  Shop faster, track orders, and get exclusive updates from the
                  mobile app.
                </Text>
                <Row width="auto" style={{ margin: "0 auto" }}>
                  <Column style={{ paddingRight: 10 }}>
                    <AppBadge variant="appStore" />
                  </Column>
                  <Column>
                    <AppBadge variant="googlePlay" />
                  </Column>
                </Row>
              </EmailCard>

              <EmailFooter
                siteUrl={siteUrl}
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

export default PasswordResetSuccessEmail;
