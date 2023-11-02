"use client";

import { MemberRole } from "@prisma/client";
import { Settings } from "lucide-react";
import ActionTooltip from "../ActionTooltip";
import { useModal } from "@/hooks/useModalStore";
import { ServerWithMembersWithProfile } from "@/types";

interface MemberTooltipProps {
  server: ServerWithMembersWithProfile;
  role: MemberRole;
}
export const MemberTooltip = ({ server, role }: MemberTooltipProps) => {
  const onOpen = useModal((state) => state.onOpen);
  if (role === MemberRole.GUEST) return null;
  return (
    <ActionTooltip side="top" align="center" label="create channel">
      <Settings
        onClick={() => onOpen("members", { server })}
        className="h-4 w-4"
      />
    </ActionTooltip>
  );
};
