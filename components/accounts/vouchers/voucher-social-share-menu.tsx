"use client";

import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Share2 } from "lucide-react";
import {
  FaFacebook,
  FaFacebookMessenger,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

type VoucherSocialShareMenuProps = {
  code: string;
  onShare?: (code: string) => void;
};

type ShareTarget = {
  label: string;
  icon: typeof FaWhatsapp;
  href: string;
};

export function VoucherSocialShareMenu({
  code,
  onShare,
}: VoucherSocialShareMenuProps) {
  const shareText = `Voucher code: ${code}`;
  const encodedShareText = encodeURIComponent(shareText);

  const shareTargets: ShareTarget[] = [
    {
      label: "WhatsApp",
      icon: FaWhatsapp,
      href: `https://wa.me/?text=${encodedShareText}`,
    },
    {
      label: "Message",
      icon: FaFacebookMessenger,
      href: `sms:?&body=${encodedShareText}`,
    },
    {
      label: "FaceBook",
      icon: FaFacebook,
      href: `https://www.facebook.com/sharer/sharer.php?quote=${encodedShareText}`,
    },
    {
      label: "Email",
      icon: MdOutlineEmail,
      href: `mailto:?subject=Voucher%20Code&body=${encodedShareText}`,
    },
    {
      label: "Telegram",
      icon: FaTelegramPlane,
      href: `https://t.me/share/url?text=${encodedShareText}`,
    },
  ];

  const openShareTarget = async (href: string) => {
    if (onShare) {
      onShare(code);
      return;
    }

    if (typeof window !== "undefined") {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator.share({
        title: "Voucher code",
        text: shareText,
      });
    }
  };

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="gap-2 rounded-lg p-4 text-sm font-medium">
        <Share2 className="size-6 text-muted-foreground" />
        Share
      </DropdownMenuSubTrigger>

      <DropdownMenuSubContent className="w-48 rounded-xl border p-3">
        <div className="grid gap-1">
          {shareTargets.map((target) => {
            const Icon = target.icon;

            return (
              <DropdownMenuItem
                key={target.label}
                className="gap-2 rounded-lg p-4 text-sm font-medium"
                onSelect={() => {
                  void openShareTarget(target.href);
                }}
              >
                <Icon className="size-6 text-muted-foreground" />
                {target.label}
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
