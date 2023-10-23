import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib";

interface UserAvatarProps {
  src?: string;
  className?: string;
  name: string;
}
export const UserAvatar = ({ src, className, name }: UserAvatarProps) => {
  return (
    <Avatar className={cn("h-6 w-6 md:h-10 md:w-10", className)}>
     <AvatarImage src={src} />
     <AvatarFallback className="bg-primary text-white">{name.charAt(0)}</AvatarFallback>
    </Avatar>
  );
};
