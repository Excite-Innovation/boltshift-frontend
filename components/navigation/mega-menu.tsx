"use client";

import { useState } from "react";
import type { ComponentProps, MouseEventHandler, ReactNode } from "react";
import Image from "next/image";
import Link, { type LinkProps } from "next/link";
import { ArrowRight, Menu, ShoppingBag, Star } from "lucide-react";
import { ProductCard } from "@/components/product-card/product-card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { catalogGroups } from "@/lib/catalog-groups";
import { GetProductItems } from "@/lib/product-items";
import { cn } from "@/lib/utils";

type CatalogLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  onLinkClick?: () => void;
};

type MegaMenuProps = {
  defaultOpen?: boolean;
};

function MenuButton({ className, ...props }: ComponentProps<typeof Button>) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label="Browse catalog"
      className={cn("rounded-md", className)}
      {...props}
    >
      <Menu className="size-6" aria-hidden="true" />
    </Button>
  );
}

function CatalogLink({
  children,
  className,
  onClick,
  onLinkClick,
  ...props
}: CatalogLinkProps) {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    onClick?.(event);

    if (!event.defaultPrevented) {
      onLinkClick?.();
    }
  };

  return (
    <Link {...props} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}

function CatalogGroups({ onLinkClick }: { onLinkClick?: () => void }) {
  return (
    <div className="pt-2 pb-8 pl-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {catalogGroups.map((group) => (
        <section key={group.title} className="min-w-0">
          <CatalogLink
            href={group.href}
            onLinkClick={onLinkClick}
            className="py-2 pl-8 flex min-w-80 items-center gap-1 text-base font-medium text-foreground hover:text-primary"
          >
            <Image
              src={group.icon}
              alt=""
              width={32}
              height={32}
              className="size-8 shrink-0 object-contain"
              aria-hidden="true"
            />
            <span className="truncate">{group.title}</span>
          </CatalogLink>

          <ul>
            {group.items.map((item) => (
              <li key={`${group.title}-${item.label}`}>
                <CatalogLink
                  href={item.href}
                  onLinkClick={onLinkClick}
                  className="py-1 pl-6 block truncate text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  {item.label}
                </CatalogLink>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function TopProducts({
  className,
  onLinkClick,
}: {
  className?: string;
  onLinkClick?: () => void;
}) {
  const products = GetProductItems().slice(3, 8);

  return (
    <aside
      className={cn("pt-2 px-4 pb-16 grid content-start gap-4", className)}
    >
      <div className="py-2 px-4 flex items-center gap-1 text-base font-medium">
        <Star
          className="size-8 fill-amber-400 text-amber-400"
          aria-hidden="true"
        />
        <span>Top 5 Products</span>
      </div>

      <div className="grid gap-4">
        {products.map((product) => (
          <div key={product.id} onClick={onLinkClick}>
            <ProductCard
              product={product}
              variant="horizontal"
              className="mx-0"
            />
          </div>
        ))}
      </div>
    </aside>
  );
}

function MegaMenuContent({
  mobile = false,
  onLinkClick,
}: {
  mobile?: boolean;
  onLinkClick?: () => void;
}) {
  return (
    <div className={cn("grid gap-6", mobile ? "pb-6" : "")}>
      <Link
        href="/catalog"
        onClick={onLinkClick}
        className="flex w-fit pt-3 pl-4 items-center gap-1 text-2xl font-semibold text-foreground hover:text-primary sm:gap-2 md:pt-8 md:pb-4 md:px-10"
      >
        <Image
          src="/popular-categories-icons/Shopping-bags.svg"
          alt=""
          width={32}
          height={32}
          className="size-8 shrink-0 object-contain"
          aria-hidden="true"
        />
        <span>Browse our Catalog</span>
        <ArrowRight className="size-6" aria-hidden="true" />
      </Link>

      <div
        className={cn("grid gap-8", mobile ? "" : "xl:grid-cols-[1fr_18rem]")}
      >
        <CatalogGroups onLinkClick={onLinkClick} />
        <TopProducts
          className={mobile ? "" : "hidden xl:grid"}
          onLinkClick={onLinkClick}
        />
      </div>
    </div>
  );
}

export function MegaMenu({ defaultOpen = false }: MegaMenuProps) {
  const [desktopOpen, setDesktopOpen] = useState(defaultOpen);
  const [mobileOpen, setMobileOpen] = useState(defaultOpen);

  return (
    <>
      {/* Desktop screen */}
      <div className="hidden md:block">
        <Popover open={desktopOpen} onOpenChange={setDesktopOpen}>
          <PopoverTrigger asChild>
            <MenuButton />
          </PopoverTrigger>
          <PopoverContent
            align="start"
            sideOffset={12}
            className="max-h-[calc(100vh-7rem)] w-[calc(100vw-2rem)] max-w-352 p-0 overflow-y-auto rounded-2xl shadow-2xl"
          >
            <MegaMenuContent onLinkClick={() => setDesktopOpen(false)} />
          </PopoverContent>
        </Popover>
      </div>

      {/* Mobile screen */}
      <div className="block md:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <MenuButton />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[80vw] max-w-none overflow-y-auto p-0 gap-0"
          >
            <SheetHeader className="border-b px-4 py-4">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <MegaMenuContent
              mobile
              onLinkClick={() => setMobileOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
