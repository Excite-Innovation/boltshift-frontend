import { Img, Section, Text } from "react-email";

import { EmailCard } from "@/email/components/email-card";
import { resolveEmailAssetSrc } from "@/email/components/email-assets";
import { EditNum } from "@/lib/utils";
import { StarRating } from "@/email/components/star-rating";

export type WelcomeProduct = {
  title: string;
  imageSrc: string;
  rating?: string;
  reviewCount?: string;
  price?: number;
};

type ProductCardProps = {
  product: WelcomeProduct;
  siteUrl: string;
};

export function ProductCard({ product, siteUrl }: ProductCardProps) {
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
        src={resolveEmailAssetSrc(product.imageSrc, siteUrl)}
        width="160"
        height="128"
        alt={product.title}
        style={{
          display: "block",
          width: "100%",
          backgroundColor: "#ffffff",
        }}
      />
      <Section style={{ padding: "0 12px" }}>
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
