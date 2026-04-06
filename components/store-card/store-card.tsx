"use client";

import Image from "next/image";
import { useState } from "react";
import { Store, Star, Plus, ChevronRight, BadgeCheck } from "lucide-react";
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
import { EditNum } from "@/lib/utils";

export function FeaturedStoreCard() {
  const [rating, setRating] = useState(4);

  const profileCover: string = "/images/Store Background.png";
  const vendorLogo: string = "/vendor-logos/Euphoria.svg";
  const vendorName: string = "Senjes Cuisines Store";
  const followers: string = EditNum(1290);

  return (
    <Card className="w-full overflow-hidden pt-0 pb-4 flex flex-col gap-12 rounded-2xl shadow-none">
      <div className="h-38 overflow-hidden relative md:h-48">
        <Image
          src={profileCover}
          alt="Store card background image"
          fill
          className="object-cover"
          priority
        />
      </div>

      <CardHeader className="-mt-35 flex flex-col items-center gap-4 md:-mt-45">
        {/* Logo */}
        <Avatar className="h-30 w-30 border-2 ring-4 ring-muted md:h-40 md:w-40">
          <AvatarImage src={vendorLogo} />
          <AvatarFallback>
            <Store size={30}/>
          </AvatarFallback>
        </Avatar>

        {/* Store name */}
        <div className="flex flex-col items-center">
          <CardTitle className="text-xl font-semibold flex gap-0.5">
            {vendorName}
            <BadgeCheck fill="#2E90FA" stroke="white"/>
          </CardTitle>
          <div className="flex gap-1">
            <Rating
              value={rating}
              className="text-[#F79009] gap-1"
              onValueChange={setRating}
            >
              {Array.from({ length: 5 }, (_, i) => (
                <RatingItem key={i}>
                  <Star />
                </RatingItem>
              ))}
            </Rating>

            <div className="text-base font-medium text-muted-foreground ">
              <p>{followers} Followers</p>
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

      <CardContent className="w-full px-4">
        <TabsLine />
      </CardContent>

      <CardFooter className="px-4">
        <PaginationLinks />
      </CardFooter>
    </Card>
  );
}
