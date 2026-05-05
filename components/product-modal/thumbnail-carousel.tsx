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
    <div className="flex flex-col gap-4 px-4 pb-4">
      {/* MAIN IMAGE */}
      <div className="relative w-full h-[414px] border rounded-xl overflow-hidden">
        <Image
          src={selectedImage}
          alt={productTitle}
          fill
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
              <CarouselItem key={index} className="basis-auto">
                <button
                  onClick={() => handleThumbnailClick(index)}
                  className={`relative w-24 h-24 rounded-xl overflow-hidden border transition-colors ${active
                      ? "border-primary"
                      : "border-muted opacity-70 hover:opacity-100"
                    }`}
                >
                  <Image
                    src={img}
                    alt={`${productTitle}-${index}`}
                    fill
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