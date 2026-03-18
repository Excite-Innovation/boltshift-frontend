import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ChevronRight } from "lucide-react";
import { HeroItem } from "@/lib/type";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type HeroCardProps = {
  item: HeroItem;
};

export function HeroCard({ item }: HeroCardProps) {
  return (
    <Card className="bg-card-foreground/10 mx-auto w-full max-w-sm pt-0 rounded-xl overflow-hidden md:flex md:flex-row-reverse md:max-w-312 md:h-148">
      {/* Image */}
      <div className="overflow-hidden relative">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="absolute right-2 top-2 z-10 rounded-full"
          aria-label={`Save ${item.title}`}
        >
          <Heart />
        </Button>
        <img
          src={item.image}
          alt={item.title}
          className="relative  aspect-square w-full h-full object-cover "
        />
      </div>

      {/* Content */}
      <div className="w-72 m-auto flex flex-col gap-5 py-4 md:max-w-72 md:gap-12">
        <CardHeader className="w-full flex flex-col gap-6">
          <CardAction className="m-auto md:m-0">
            <Badge
              variant="secondary"
              className="h-7 w-53.25 rounded-md border border-primary/50 bg-background px-2.5 py-1 md:w-fit"
            >
              {item.badge}
            </Badge>
          </CardAction>

          <div className="w-full flex flex-col gap-1">
            <CardTitle className="text-card-foreground text-3xl text-start font-semibold">{item.title}</CardTitle>

            <CardDescription>{item.description}</CardDescription>
          </div>
        </CardHeader>
        <CardFooter className="w-full">
          <Button
            size="lg"
            className="w-full h-11 rounded-lg border-2 py-2.5 px-4 flex items-center justify-center gap-1.5"
          >
            Shop Now
            <ChevronRight className="size-5" />
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
