import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Review } from "@/lib/type";
import { Badge } from "@/components/ui/badge";
import { StartRating } from "@/components/rating/rating";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditNum } from "@/lib/utils";

type ReviewCardProps = {
  review: Review;
};

export function ReviewCard({ review }: ReviewCardProps) {
  const price = EditNum(review.product.price);

  return (
    <Card className="max-w-72 p-4 bg-card border flex flex-col gap-4 shrink-0 hover:cursor-pointer">
      <CardHeader className="p-0 flex flex-col gap-3">
        <div className="flex gap-3">
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
                <Badge variant="outline" className="py-0.5 px-2 bg-muted">
                  Verified Buyer
                </Badge>
              </CardAction>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                {review.date}
              </p>
              <StartRating value={review.rating} readonly={true} />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <CardDescription className="line-clamp-5 text-xs">
            {review.reviewText}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex gap-2">
        <div className="w-20 h-20 rounded-xl overflow-hidden relative shrink-0">
          <Image
            src={review.product.image}
            alt={review.product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="line-clamp-3 text-xs font-semibold">
            {review.product.name}
          </p>
          <p className="text-primary">
            <span className="text-xs">Kshs.</span>
            <span className="text-xs font-medium">
              {price}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}