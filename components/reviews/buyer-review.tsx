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
import { User, Check, Dot, ThumbsUp, ThumbsDown, ChevronDown } from "lucide-react";
import { StartRating } from "@/components/rating/rating";
import { Button } from "@/components/ui/button";
import { FormatNumber } from "@/lib/utils";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ModalWrapper } from "@/components/product-modal/modal-wraper";

type ReviewCardProps = {
  review: Review;
};

export function BuyerReviewCard({ review }: ReviewCardProps) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const likes = FormatNumber(review.reactions.likes);
  const dislikes = FormatNumber(review.reactions.dislikes);

  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="w-full py-8 shadow-none border-0 flex flex-col gap-5 bg-card">
      <div className="w-full flex flex-col gap-2 justify-between sm:flex-row items-start">
        {/* Buyer information and star rating */}
        <div className="flex gap-3 pl-1">
          {/* Image */}
          <Avatar className="h-16 w-16 border border-border ring-4 ring-muted shadow-md">
            <AvatarImage src={review.avatar} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>

          {/* Reviewer */}
          <div className="flex flex-col gap-1">
            <div className="flex flex-col ">
              <CardTitle className="text-base font-semibold">
                {review.name}
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
              <p className="text-xs text-muted-foreground">{review.date}</p>
              <StartRating value={review.rating} readonly={true} />
            </div>
          </div>
        </div>

        {/* Edited review badge */}
        {review.isEdited && (
          <Badge variant="outline" className="py-1 px-2.5 rounded-(--radius)">
            <Dot data-icon="inline-start" className="text-primary w-6 h-6" />
            (Edited) Review
          </Badge>
        )}
      </div>

      <CardHeader className="w-full px-0">
        <CardTitle className="font-semibold text-base">
          {review.reviewHeading}
        </CardTitle>
        <CardDescription
          className={`text-sm transition-all duration-300 ${expanded ? "line-clamp-none" : "line-clamp-3"
            }`}
        >
          {review.reviewText}
        </CardDescription>

        {/* Show more button */}
        <Button
          variant="ghost"
          onClick={() => setExpanded(!expanded)}
          className="w-fit px-0 text-muted-foreground hover:text-secondary-foreground"
        >
          {expanded ? "Show less" : "Show more"}

          <ChevronDown
            className={`w-4 h-4 ml-1 transition-transform duration-300 ${expanded ? "rotate-180" : "rotate-0"
              }`}
          />
        </Button>
      </CardHeader>
      <CardContent className="w-full px-0 flex gap-3 overflow-x-auto scroll-smooth scrollbar-hide">
        {review.productUploads?.map((image, index) => (
          <ModalWrapper
            key={`${review.id}-${index}`}
            productTitle={review.reviewHeading}
            vendorName={review.product.vendor}
            rating={review.rating}
            productItems={review.productUploads || []}
          >
            <div className="w-24 h-24 rounded-xl overflow-hidden relative shrink-0 cursor-pointer">
              <Image
                src={image}
                alt="product review image"
                fill
                sizes="96px"
                className="rounded-(--radius) object-cover border"
              />
            </div>
          </ModalWrapper>
        ))}
      </CardContent>
      <CardFooter className="px-0 flex gap-6">
        <p className="font-semibold text-sm">Was this review helpful?</p>

        <div className="flex gap-1">
          <Button
            variant="ghost"
            onClick={() => {
              setLiked(!liked);
              if (!liked) setDisliked(false);
            }}
            className={cn(
              "rounded-[80px] p-2 flex gap-1 hover:text-[#079455]",
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
            variant="ghost"
            onClick={() => {
              setDisliked(!disliked);
              if (!disliked) setLiked(false);
            }}
            className={cn(
              "rounded-[80px] p-2 flex gap-1 hover:text-[#D92D20]",
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
