"use client";

import Link from "next/link";
import { ViewTransition, useDeferredValue, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ChevronRight } from "lucide-react";
import { HeroItem } from "@/types/type";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type HeroCardProps = {
  item: HeroItem;
  count: number;
  current: number;
  onDotClick: (index: number) => void;
};

export function HeroCard({
  item,
  count,
  current,
  onDotClick,
}: HeroCardProps) {
  const [saved, setSaved] = useState(false);
  const deferredSaved = useDeferredValue(saved);

  return (
    <Card className="bg-card-foreground/10 mx-auto w-full py-0  gap-6 rounded-xl overflow-hidden md:flex md:flex-row-reverse md:max-w-312 md:h-148">
      {/* Image */}
      <div className="overflow-hidden relative md:flex-1">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={() => setSaved((current) => !current)}
          className={cn(
            "bg-background/50 border-0 absolute right-2 top-2 z-10 rounded-full hover:cursor-pointer hover:bg-background/50",
            deferredSaved ? "text-red-500" : "",
          )}
          aria-label={`Save ${item.title}`}
        >
          <ViewTransition
            name={`hero-heart-${item.title}`}
            share="auto"
            enter="auto"
            default="none"
          >
            <Heart
              aria-hidden="true"
              className={deferredSaved ? "fill-current" : ""}
            />
          </ViewTransition>
        </Button>
        <img
          src={item.image}
          alt={item.alt}
          className="aspect-square object-cover md:h-full md:w-full"
        />

        <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 md:hidden">
          <PaginationDots
            count={count}
            current={current}
            onDotClick={onDotClick}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative w-[85vw] m-auto flex flex-col gap-8 py-4 md:h-full md:max-w-none md:flex-1 md:gap-12 md:pb-28 md:pt-20">
        <CardHeader className="w-full flex flex-col gap-6 md:w-72 md:mx-auto md:flex-1 md:p-0">
          <CardAction className="m-auto md:m-0">
            <Badge
              variant="secondary"
              className="h-7 w-53.25 rounded-md border border-primary/50 bg-background px-2.5 py-1 md:w-fit"
            >
              {item.badge}
            </Badge>
          </CardAction>

          <div className="w-full flex flex-col gap-1">
            <CardTitle className="text-card-foreground text-3xl text-start font-semibold line-clamp-3 md:line-clamp-none">
              {item.title}
            </CardTitle>

            <CardDescription className="line-clamp-3">
              {item.description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardFooter className="w-full md:w-72 md:mx-auto md:p-0">
          <Button
            asChild
            size="lg"
            className="w-full h-11 rounded-lg border-2 py-2.5 px-4 flex items-center justify-center gap-1.5 hover:cursor-pointer"
          >
            <Link href={item.href} transitionTypes={["cross-fade"]}>
              Shop Now
              <ChevronRight className="size-5" aria-hidden="true" />
            </Link>
          </Button>
        </CardFooter>

        <div className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 md:flex">
          <PaginationDots
            count={count}
            current={current}
            onDotClick={onDotClick}
          />
        </div>
      </div>
    </Card>
  );
}

type PaginationDotsProps = {
  count: number;
  current: number;
  onDotClick: (index: number) => void;
};

function PaginationDots({ count, current, onDotClick }: PaginationDotsProps) {
  return (
    <div className="bg-white/90 p-2 h-6 rounded-full flex gap-3">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onDotClick(index)}
          className={cn(
            "h-2 rounded-full transition-all duration-500 ease-in-out",
            index === current ? "bg-primary w-7" : "bg-muted-foreground/40 w-2 md:bg-muted-foreground/20",
          )}
        />
      ))}
    </div>
  );
}
