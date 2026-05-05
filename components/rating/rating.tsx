import { Rating, RatingItem } from "@/components/ui/rating";
import { MdOutlineStar } from "react-icons/md";

type StarRatingProps = {
  id?: string;
  value: number;
  readonly?: boolean;
};

export function StartRating({ id, value, readonly }: StarRatingProps) {
  return (
    <div id={id} className="flex gap-2">
      <Rating value={value} readOnly={readonly} className="gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <RatingItem
            key={i}
            className="text-gray-400 data-[state=full]:text-[#F79009] data-[state=empty]:[&_svg]:fill-gray-400"
          >
            <MdOutlineStar size={32} />
          </RatingItem>
        ))}
      </Rating>
    </div>
  );
}
