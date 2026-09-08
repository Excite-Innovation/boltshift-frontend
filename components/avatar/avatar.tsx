import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUserRound } from "lucide-react";

type AvatarProfileProps = {
  src?: string | null;
  alt?: string;
};

export function AvatarProfile({
  src,
  alt = "Profile avatar",
}: AvatarProfileProps) {
  return (
    <Avatar>
      {src ? <AvatarImage src={src} alt={alt} /> : null}
      <AvatarFallback>
        <CircleUserRound className="size-4" aria-hidden="true" />
      </AvatarFallback>
    </Avatar>
  );
}
