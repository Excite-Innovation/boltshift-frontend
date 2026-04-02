import { SectionTitle } from "@/components/section-title";
import { ReviewCard } from "@/components/reviews/reviews-card";
import { GetReviews } from "@/lib/reviews";
import { Review } from "@/lib/type";

export function ReviewSection() {
  const title = "Review spotlight";
  const icon = "/section-title-icons/Thumbs_up.svg";
  const alt = "Thumb's up emoji icon";

  const reviews: Review[] = GetReviews();

  return (
    <div className="py-12 flex flex-col gap-10">
      <SectionTitle title={title} icon={icon} alt={alt} />

      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
