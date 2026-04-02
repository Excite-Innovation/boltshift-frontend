import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { StartRating } from "@/components/rating/rating";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ReviewCard() {
  return (
    <Card className="max-w-72 p-4 bg-card border flex flex-col gap-4 shrink-0">
      <CardHeader className="p-0 flex flex-col gap-3">
        <div className="flex gap-3">
          {/* Image */}
          <Avatar className="h-16 w-16 border border-border ring-4 ring-muted shadow-md">
            <AvatarImage src="/reviewers/Paul.png" />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>

          {/* Reviewer */}
          <div className="flex flex-col gap-1">
            <div className="flex flex-col ">
              <CardTitle className="text-base font-semibold">
                Paul Mbingu
              </CardTitle>
              <CardAction>
                <Badge variant="outline" className="py-0.5 px-2 bg-muted">
                  Verified Buyer
                </Badge>
              </CardAction>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Nov 26, 2023</p>
              <StartRating value={4} />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <CardDescription className="line-clamp-5 text-xs">
            We’ve tried countless prototyping tools and ProtoPie is hands down
            the most flexible and powerful tool that fits perfectly into any
            team’s workflow. No matter which tools or platform are being used,
            we can import our design assets in seconds and make awesome
            code-free prototypes in minutes.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex gap-2">
        <div className="w-20 h-20 rounded-xl overflow-hidden relative shrink-0">
            <Image
              src="https://i.pinimg.com/736x/eb/c6/9f/ebc69f2a0277643a83694ae8d50030f5.jpg"
              alt="Paul's photo"
              fill
              className="object-cover"
            />
        </div>
        <div className="flex flex-col gap-1">
          <p className="line-clamp-3 text-xs font-semibold">
            Modern White Velvet 3-Seater Sofa Channel Tufted Upholstered Luxury
            Solid Wood
          </p>
          <p className="text-primary">
            <span className="text-xs">Kshs.</span>
            <span className="text-xs font-medium">92,372</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
