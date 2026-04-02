import { Rating, RatingItem } from "@/components/ui/rating";
import { Star } from "lucide-react";

type StarRatingProps = {
  value: number;
};

export function StartRating({value}: StarRatingProps) {
  return (
    <div className="flex gap-2">
      <Rating value={value} className="text-[#F79009] gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <RatingItem key={i}>
            <Star size={20} />
          </RatingItem>
        ))}
      </Rating>
    </div>
  );
}
