import { cn } from "@/lib";
import { MemberRole } from "@prisma/client";
import { CrownIcon, ShieldCheck } from "lucide-react";

interface RoleIconProps {
  role?: string;
  className?: string;
}

export const RoleIcon = ({ role, className }: RoleIconProps) => {
  if (role === MemberRole.MODERATOR) {
    return <ShieldCheck className={cn("h-5 w-5", className)} />;
  } else if (role === MemberRole.ADMIN) {
    return <CrownIcon className={cn("h-4 w-4", className)} />;
  }
  return null;
};
