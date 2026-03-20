import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CircleUserRound } from 'lucide-react';

export function AvatarProfile() {
  return (
    <Avatar>
      <AvatarImage
        src="https://github.com/denilany.png"
        alt="Image profile"
      />
      <AvatarFallback><CircleUserRound /></AvatarFallback>
    </Avatar>
  )
}
