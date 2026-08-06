import { Img } from "react-email";

import { EMAIL_ASSETS } from "@/email/components/email-assets";

type AppBadgeVariant = "appStore" | "googlePlay";

type AppBadgeProps = {
  variant: AppBadgeVariant;
  alt?: string;
  width?: number;
  height?: number;
};

const APP_BADGE_ASSET_MAP: Record<AppBadgeVariant, string> = {
  appStore: EMAIL_ASSETS.appStoreBadge,
  googlePlay: EMAIL_ASSETS.googlePlayBadge,
};

const APP_BADGE_ALT_MAP: Record<AppBadgeVariant, string> = {
  appStore: "Download on the App Store",
  googlePlay: "Get it on Google Play",
};

export function AppBadge({
  variant,
  alt,
  width = 135,
  height = 40,
}: AppBadgeProps) {
  return (
    <Img
      src={APP_BADGE_ASSET_MAP[variant]}
      alt={alt ?? APP_BADGE_ALT_MAP[variant]}
      width={String(width)}
      height={String(height)}
      style={{ display: "block" }}
    />
  );
}
