import { Rating, RatingItem } from "@/components/ui/rating";
import { Progress } from "@/components/ui/progress";
import { PenLine, Star } from "lucide-react";

const ratingData = [
  { stars: 5, value: 95, count: "5.21k" },
  { stars: 4, value: 80, count: "2.44k" },
  { stars: 3, value: 50, count: "523" },
  { stars: 2, value: 20, count: "319" },
  { stars: 1, value: 5, count: "72" },
];

type RatingProgressProp = {
  stars: number;
  value: number;
  count: string;
};

function RatingProgressItem({ stars, value, count }: RatingProgressProp) {
  return (
    <div className="w-full flex gap-2">
      <div className="pr-4 flex">
        <p className="min-w-6 px-1 grid gap-2 text-center">{stars}</p>
        <Rating value={1} readOnly className="text-[#F79009]">
          <RatingItem>
            <Star size={20} />
          </RatingItem>
        </Rating>
      </div>

      <div className="flex items-center gap-1 w-full">
        <div className="w-34">
          <Progress className="flex-1 h-1" value={value} />
        </div>
        <p className="text-primary px-1 grid gap-2.5">{count}</p>
      </div>
    </div>
  );
}

export function RatingBreakdown() {
  return (
    <div className="min-w-72 py-4 pr-8 flex flex-col gap-2">
      {ratingData.map((item) => (
        <RatingProgressItem
          key={item.stars}
          stars={item.stars}
          value={item.value}
          count={item.count}
        />
      ))}
    </div>
  );
}
