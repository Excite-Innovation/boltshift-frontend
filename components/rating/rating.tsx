import { Rating, RatingItem } from "@/components/ui/rating";
import { Star } from "lucide-react";

type StarRatingProps = {
  id?: string;
  value: number;
  readonly?: boolean;
};

export function StartRating({ id, value, readonly }: StarRatingProps) {
  return (
    <div id={id} className="flex gap-2">
      <Rating value={value} readOnly={readonly} className="text-[#F79009] gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <RatingItem key={i}>
            <Star size={20} />
          </RatingItem>
        ))}
      </Rating>
    </div>
  );
}
