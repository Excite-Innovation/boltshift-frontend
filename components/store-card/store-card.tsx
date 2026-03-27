'use client'

import Image from "next/image";
import { useState } from "react";
import { User, Star, Plus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Rating, RatingItem } from "@/components/ui/rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsLine } from "@/components/store-card/tabs";
import { PaginationLinks } from "@/components/store-card/pagination";

export function FeaturedStoreCard() {
  const [rating, setRating] = useState(4);

  const profileCover: string = "/images/Store Background.png";
  const vendorLogo: string = "/vendor-logos/Euphoria.svg";
  const vendorName: string = "Senjes Cuisines Store";
  const folowers: number = 1290;

  return (
    <Card className="overflow-hidden pt-0 pb-4 grid gap-12 rounded-2xl">
      <div className="h-48 w-full overflow-hidden relative">
        <Image
          src={profileCover}
          alt="Store card background image"
          fill
          className="object-cover"
          priority
        />
      </div>

      <CardHeader className="flex flex-col items-center gap-4">
        {/* Logo */}
        <Avatar size="lg" className="border-2 ring-4 ring-muted">
          <AvatarImage src={vendorLogo} className="h-40 aspect-square" />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>

        {/* Store name */}
        <div className="flex flex-col items-center">
          <CardTitle className="text-xl font-semibold">{vendorName}</CardTitle>
          <div className="flex gap-1">
            <Rating
              value={rating}
              className="text-[#F79009] gap-1"
              step={0.5}
              onValueChange={setRating}
            >
              {Array.from({ length: 5 }, (_, i) => (
                <RatingItem key={i}>
                  <Star />
                </RatingItem>
              ))}
            </Rating>

            <div className="text-base font-medium text-muted-foreground ">
              <p>{folowers} Followers</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-4">
          <Button variant="outline">
            Follow Us <Plus />
          </Button>
          <Button>
            Visit Store <ChevronRight />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-4">
        <TabsLine />
      </CardContent>

      <CardFooter className="px-4">
        <PaginationLinks />
      </CardFooter>
    </Card>
  );
}
