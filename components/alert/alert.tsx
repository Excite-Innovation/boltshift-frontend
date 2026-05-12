"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";
import { toast, type ExternalToast, type ToastT } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SonnerVariant = "success" | "delete";

export type SonnerMessageProps = {
  variant?: SonnerVariant;
  title?: string;
  description?: string;
  icon?: ReactNode;
  iconSrc?: string;
  iconAlt?: string;
  actionLabel?: string;
  className?: string;
  iconClassName?: string;
  toastOptions?: ExternalToast;
};

type AlertToastProps = Omit<SonnerMessageProps, "actionLabel" | "toastOptions"> & {
  id: ToastT["id"];
};

type VariantConfig = {
  iconSrc: string;
  borderClassName: string;
  outerClassName: string;
  innerClassName: string;
  defaultTitle: string;
  defaultDescription: string;
};

const variantConfig: Record<SonnerVariant, VariantConfig> = {
  success: {
    iconSrc: "/sonnar/Green-Featured-outline.svg",
    borderClassName: "border-emerald-500",
    outerClassName: "border-emerald-100 bg-emerald-50",
    innerClassName: "border-emerald-200 text-emerald-600",
    defaultTitle: "Review Published Successfully",
    defaultDescription: "Your review has been submitted and is live.",
  },
  delete: {
    iconSrc: "/sonnar/Red-Featured-outline.svg",
    borderClassName: "border-destructive",
    outerClassName: "border-red-100 bg-red-50",
    innerClassName: "border-red-200 text-destructive",
    defaultTitle: "Item Removed Successfully",
    defaultDescription: "The item has been removed.",
  },
};

function AlertIcon({
  icon,
  iconSrc,
  iconAlt = "",
  variant,
  className,
}: {
  icon?: ReactNode;
  iconSrc?: string;
  iconAlt?: string;
  variant: SonnerVariant;
  className?: string;
}) {
  const config = variantConfig[variant];
  const imageSrc = iconSrc ?? (icon ? undefined : config.iconSrc);

  return (
    <div
      className={cn(
        "relative flex size-14 shrink-0 items-center justify-center",
        !imageSrc && "rounded-full border-2",
        !imageSrc && config.outerClassName,
        className,
      )}
    >
      {imageSrc ? (
        <>
          <img
            src={imageSrc}
            alt={iconAlt}
            aria-hidden={iconAlt ? undefined : "true"}
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 size-14 max-w-none -translate-x-1/2 -translate-y-1/2 object-contain select-none"
          />
          {icon && (
            <span className={cn("relative z-10 flex items-center justify-center", config.innerClassName)}>
              {icon}
            </span>
          )}
        </>
      ) : (
        <div
          className={cn(
            "flex size-10 items-center justify-center rounded-full border-2 bg-background",
            config.innerClassName,
          )}
        >
          {icon}
        </div>
      )}
    </div>
  );
}

function AlertToast({
  id,
  variant = "success",
  title,
  description,
  icon,
  iconSrc,
  iconAlt,
  className,
  iconClassName,
}: AlertToastProps) {
  const config = variantConfig[variant];

  return (
    <div
      className={cn(
        "flex w-[calc(100vw-2rem)] max-w-100 items-center gap-3 rounded-xl border bg-background px-4 py-3 shadow-sm",
        config.borderClassName,
        className,
      )}
    >
      <AlertIcon
        icon={icon}
        iconSrc={iconSrc}
        iconAlt={iconAlt}
        variant={variant}
        className={iconClassName}
      />

      <div className="min-w-0 flex-1">
        <p className="text-lg font-bold leading-6 text-foreground">
          {title ?? config.defaultTitle}
        </p>
        <p className="mt-1 text-base leading-6 text-muted-foreground">
          {description ?? config.defaultDescription}
        </p>
      </div>

      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => toast.dismiss(id)}
        className="flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <X className="size-6" aria-hidden="true" />
      </button>
    </div>
  );
}

export function showSonnerMessage({
  toastOptions,
  ...props
}: SonnerMessageProps = {}) {
  return toast.custom((id) => <AlertToast id={id} {...props} />, {
    duration: 5000,
    position: "top-right",
    ...toastOptions,
  });
}

export function SonnerMessage({
  actionLabel = "Show Toast",
  ...props
}: SonnerMessageProps) {
  return (
    <Button variant="outline" onClick={() => showSonnerMessage(props)}>
      {actionLabel}
    </Button>
  );
}
