import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AvatarProfile() {
  return (
    <Avatar>
      <AvatarImage
        src="https://github.com/denilany.png"
        alt="Image profile"
      />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  )
}
