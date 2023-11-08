import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib";

interface UserAvatarProps {
  src?: string;
  className?: string;
  name: string;
  onClick?: () => void;
}
export const UserAvatar = ({
  src,
  className,
  name,
  onClick,
}: UserAvatarProps) => {
  return (
    <Avatar
      onClick={onClick}
      className={cn("h-6 w-6 md:h-10 md:w-10", className)}
    >
      <AvatarImage src={src} />
      <AvatarFallback className="bg-primary text-white">
        {name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};
