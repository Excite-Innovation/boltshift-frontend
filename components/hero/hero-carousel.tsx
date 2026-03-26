"use client";

import * as React from "react";
import { HeroCard } from "./hero-card";
import { HeroItems } from "@/lib/hero-data";
import Autoplay from "embla-carousel-autoplay";
import Fade from 'embla-carousel-fade'
import { cn } from "@/lib/utils";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

type Interactions = {
  count: number;
  current: number;
  onDotClick: (index: number) => void;
};

export function HeroCarousel() {
  const [api, setApi] = React.useState<any>(null);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const plugin = React.useRef(
    Autoplay({
      delay: 8000,
      stopOnInteraction: true,
    }),
  );

  return (
    <div className="w-full relative">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current, Fade()]}
        opts={{ loop: true }}
        className="pt-4 w-full"
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.play()}
      >
        <CarouselContent>
          {HeroItems.map((item) => (
            <CarouselItem key={item.id}>
              <HeroCard item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 translate-y-[200%] z-20 md:left-1/4 md:top-[80%] md:translate-y-[300%]">
        <PaginationDots
          count={count}
          current={current}
          onDotClick={(i) => api?.scrollTo(i)}
        />
      </div>
    </div>
  );
}

function PaginationDots({ count, current, onDotClick }: Interactions) {
  return (
    <div className="bg-white/40 p-2 h-6 rounded-full flex gap-3">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={cn(
            "h-2 rounded-full transition-all duration-500 ease-in-out",
            index === current ? "bg-primary w-7" : "bg-muted/40 w-2 md:bg-muted",
          )}
        />
      ))}
    </div>
  );
}
