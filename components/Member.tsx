import { MemberRole } from "@prisma/client";
import { RoleIcon } from "./RoleIcon";

interface MemberProps {
  name: string;
  role: MemberRole;
  className?: string;
}

export const Member = ({ name, role , className}: MemberProps) => {
  return (
    <div className="flex gap-2 items-center">
      <p className={className}>{name}</p>
      <RoleIcon role={role} />
    </div>
  );
};
