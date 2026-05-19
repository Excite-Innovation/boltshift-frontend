"use client";

import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { RadioGroupItem } from "@/components/ui/radio-group";

type DeliveryMethodCardProps = Omit<
  React.ComponentProps<typeof RadioGroupItem>,
  "children"
> & {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  iconSrc?: string;
  iconAlt?: string;
  forceHover?: boolean;
};

export function DeliveryMethodCard({
  title = "Free Delivery Kshs 0",
  description = "5 - 7 Days Delivery",
  icon,
  iconSrc = "/delivery-method/Bicycle.svg",
  iconAlt = "",
  forceHover = false,
  className,
  id,
  ...props
}: DeliveryMethodCardProps) {
  const generatedId = React.useId();
  const radioId = id ?? generatedId;

  return (
    <label
      htmlFor={radioId}
      className={cn(
        "group flex min-h-22 w-full max-w-104 cursor-pointer items-center gap-1 rounded-lg border bg-card px-4 py-6 text-left outline-none transition-colors",
        "border-border text-card-foreground",
        "hover:text-primary hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:[&_.delivery-method-description]:text-primary",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "[&:has([data-state=checked])]:bg-primary-foreground [&:has([data-state=checked])]:text-primary [&:has([data-state=checked])]:ring-2 [&:has([data-state=checked])]:ring-primary [&:has([data-state=checked])]:ring-offset-2 [&:has([data-state=checked])_.delivery-method-description]:text-primary",
        forceHover &&
          "border-border text-primary ring-2 ring-offset-2 ring-primary [&_.delivery-method-description]:text-primary",
        className,
      )}
    >
      <div className="w-90 flex gap-4 items-center">
        <span className="flex size-8 shrink-0 items-center justify-center">
          {icon ?? (
            <Image
              src={iconSrc}
              alt={iconAlt}
              width={32}
              height={32}
              aria-hidden={iconAlt ? undefined : "true"}
            />
          )}
        </span>

        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="truncate text-sm font-semibold">{title}</span>
          <span className="delivery-method-description truncate text-sm text-muted-foreground">
            {description}
          </span>
        </span>
      </div>

      <RadioGroupItem
        id={radioId}
        className={cn(
          "size-5 border-border text-transparent",
          "hover:border-primary group-hover:border-primary",
          "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
          "[&_svg]:size-2.5",
        )}
        {...props}
      />
    </label>
  );
}
