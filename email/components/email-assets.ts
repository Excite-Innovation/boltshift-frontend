export const EMAIL_ASSETS = {
  logo:
    "https://res.cloudinary.com/jp2lbxl9/image/upload/v1785999175/Brand_Logo_j44qzf.png",
  appStoreBadge:
    "https://res.cloudinary.com/jp2lbxl9/image/upload/v1785999175/app_store_badge_dtp5ik.png",
  googlePlayBadge:
    "https://res.cloudinary.com/jp2lbxl9/image/upload/v1785999175/play_storebadge_plrvkk.png",
  welcomeProductImage:
    "https://i.pinimg.com/736x/a4/ee/14/a4ee14303302dc2e75637b04e42a9b03.jpg",
} as const;

export function resolveEmailAssetSrc(src: string, siteUrl?: string) {
  if (/^https?:\/\//i.test(src) || !siteUrl) {
    return src;
  }

  return new URL(src, siteUrl).toString();
}
