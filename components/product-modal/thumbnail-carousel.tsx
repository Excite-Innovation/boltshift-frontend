"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

type ProductImageCarouselProps = {
  images: string[];
  productTitle: string;
};

export function ProductImageCarousel({
  images,
  productTitle,
}: ProductImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedImage = images[selectedIndex];

  // Sync carousel → state
  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setSelectedIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const handleThumbnailClick = (index: number) => {
    api?.scrollTo(index);
    setSelectedIndex(index);
  };

  return (
    <div className="flex max-h-[calc(100dvh-7rem)] flex-col gap-4 overflow-y-auto px-4 pb-4">
      {/* MAIN IMAGE */}
      <div className="relative aspect-4/3 w-full max-h-[min(60dvh,414px)] min-h-48 border rounded-xl overflow-hidden">
        <Image
          src={selectedImage}
          alt={productTitle}
          fill
          sizes="(min-width: 768px) 768px, calc(100vw - 4rem)"
          className="object-cover transition-opacity duration-300"
          priority
        />
      </div>

      {/* THUMBNAILS */}
      <Carousel setApi={setApi} opts={{ align: "start", dragFree: true }}>
        <CarouselContent className="ml-0 gap-4">
          {images.map((img, index) => {
            const active = index === selectedIndex;

            return (
              <CarouselItem key={index} className="basis-auto pt-1">
                <button
                  onClick={() => handleThumbnailClick(index)}
                  className={`relative h-20 w-20 rounded-xl overflow-hidden border transition-colors sm:h-24 sm:w-24 ${active
                      ? "ring-2 ring-offset-1 ring-ring"
                      : "border-muted opacity-70 hover:opacity-100"
                    }`}
                >
                  <Image
                    src={img}
                    alt={`${productTitle}-${index}`}
                    fill
                    sizes="(min-width: 640px) 96px, 80px"
                    className="object-cover"
                  />
                </button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
