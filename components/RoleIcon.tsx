import { MemberRole } from "@prisma/client";
import { CrownIcon, ShieldCheck } from "lucide-react";

interface RoleIconProps {
  role: string;
}

export const RoleIcon = ({ role }: RoleIconProps) => {
  if (role === MemberRole.MODERATOR) {
    return <ShieldCheck className="h-5 w-5" />;
  } else if (role === MemberRole.ADMIN) {
    return <CrownIcon className="h-4 w-4" />;
  }
  return null;
};
