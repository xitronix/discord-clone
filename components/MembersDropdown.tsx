"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
} from "@/components/ui/DropdownMenu";
import { Member, MemberRole } from "@prisma/client";
import { Check, Loader2, MoreVertical } from "lucide-react";
import { useState } from "react";
import { useModal } from "@/hooks/useModalStore";
import { MembersWithProfile } from "@/types";

interface MembersDropdownProps {
  member: MembersWithProfile;
  serverId: string;
}

export const MembersDropdown = ({ member, serverId }: MembersDropdownProps) => {
  const [loadingMemberId, setLoadingMemberId] = useState<string>();
  const onOpen = useModal((state) => state.onOpen);

  if (loadingMemberId === member.id)
    return <Loader2 className="h-4 w-4 animate-spin" />;

  const onRoleChange = async (role: MemberRole) => {
    try {
      if (role === member.role) {
        return;
      }
      setLoadingMemberId(member.id);
      const response = await fetch(
        `/api/members/${member.id}?serverId=${serverId}`,
        {
          method: "PATCH",
          body: JSON.stringify({ role }),
        }
      );
      const server = await response.json();
      onOpen("members", { server });
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMemberId(undefined);
    }
  };

  return (
    <div className="ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger
          className="focus:outline-none outline-none shadow-none"
          asChild
        >
          <MoreVertical className="h-4 w-4 cursor-pointer focus:shadow-sm" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="right"
          className="text-xs font-meduim space-y-1"
        >
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Change role</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="cursor-pointer">
                <RoleDropdownMenuItem
                  role="MODERATOR"
                  currentMember={member}
                  onClick={() => onRoleChange("MODERATOR")}
                />
                <RoleDropdownMenuItem
                  role="GUEST"
                  currentMember={member}
                  onClick={() => onRoleChange("GUEST")}
                />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              try {
                setLoadingMemberId(member.id);
                const response = await fetch(
                  `/api/members/${member.id}?serverId=${serverId}`,
                  {
                    method: "DELETE",
                  }
                );
                const server = await response.json();
                onOpen("members", { server });
              } catch (e) {
                console.error(e);
              } finally {
                setLoadingMemberId(undefined);
              }
            }}
            className="text-rose-500 focus:bg-rose-500"
          >
            Kick
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

interface RoleDropdownMenuItemProps {
  role: MemberRole;
  currentMember: Member;
  onClick: () => {};
}

const RoleDropdownMenuItem = ({
  role,
  currentMember,
  onClick,
}: RoleDropdownMenuItemProps) => {
  return (
    <DropdownMenuItem onClick={onClick} className="flex justify-between gap-4">
      {role} {role === currentMember.role && <Check className="h-4 w-4" />}
    </DropdownMenuItem>
  );
};
