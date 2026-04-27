"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Review } from "@/types/type";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Check, Dot, ThumbsUp, ThumbsDown } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { StartRating } from "@/components/rating/rating";
import { Button } from "@/components/ui/button";
import { EditNum } from "@/lib/utils";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type ReviewCardProps = {
  reviews: Review;
};

export function BuyerReviewCard({ reviews }: ReviewCardProps) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const likes = EditNum(reviews.reactions.likes);
  const dislikes = EditNum(reviews.reactions.dislikes);

  return (
    <Card className="w-full py-8 border-b flex flex-col gap-5 bg-card">
      <div className="w-full flex flex-col gap-1.5 justify-between sm:flex-row">
        {/* Buyer information and star rating */}
        <div className="flex gap-3">
          {/* Image */}
          <Avatar className="h-16 w-16 border border-border ring-4 ring-muted shadow-md">
            <AvatarImage src={reviews.avatar} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>

          {/* Reviewer */}
          <div className="flex flex-col gap-1">
            <div className="flex flex-col ">
              <CardTitle className="text-base font-semibold">
                {reviews.name}
              </CardTitle>
              <CardAction>
                <Badge
                  variant="outline"
                  className="py-0.5 px-2 bg-muted font-medium"
                >
                  <Check />
                  Verified Buyer
                </Badge>
              </CardAction>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{reviews.date}</p>
              <StartRating value={reviews.rating} readonly={true} />
            </div>
          </div>
        </div>

        {/* Edited review badge */}
        <Badge variant="outline" className="py-1 px-2.5">
          <Dot data-icon="inline-start" />
          Your Review (Edited)
        </Badge>
      </div>

      <CardHeader className="w-full">
        <CardTitle>{reviews.reviewHeading}</CardTitle>
        <CardDescription className="line-clamp-3">{reviews.reviewText}</CardDescription>
      </CardHeader>

      <CardContent className="flex gap-3 overflow-x-auto">
        {reviews.productUploads?.map((image) => (
          <AspectRatio ratio={1 / 1} className="w-24">
            <Image
              src={image}
              alt="product review image"
              className="rounded-(--radius) object-cover border"
            />
          </AspectRatio>
        ))}
      </CardContent>

      <CardFooter className="flex gap-6">
        <p>Was this review helpful?</p>

        <div className="flex gap-1">
          <Button
            onClick={() => {
              setLiked(!liked);
              if (!liked) setDisliked(false);
            }}
            className={cn(
              "rounded-[80px] p-2 flex gap-1 hover:text-[#079455] hover:bg-muted",
              liked ? "text-[#079455]" : "",
            )}
          >
            <ThumbsUp
              className={cn(liked ? "fill-current" : "")}
              data-icon="inline-start"
            />
            {likes}
          </Button>

          <Button
            onClick={() => {
              setDisliked(!disliked);
              if (!disliked) setLiked(false);
            }}
            className={cn(
              "rounded-[80px] p-2 flex gap-1 hover:text-[#D92D20] hover:bg-muted",
              disliked ? "text-[#D92D20]" : "",
            )}
          >
            <ThumbsDown
              className={cn(disliked ? "fill-current" : "")}
              data-icon="inline-start"
            />
            {dislikes}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
