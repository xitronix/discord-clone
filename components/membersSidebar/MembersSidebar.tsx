"use client";

import { useMembers } from "@/hooks/useMembers";
import { MemberTooltip } from "./MemberTooltip";
import { MemberLink } from "./MemberLink";
import { ServerWithMembersWithProfile } from "@/types";

export const MembersSidebar = ({
  server,
  profileId,
}: {
  server: ServerWithMembersWithProfile | null;
  profileId: string;
}) => {
  const { isOpen } = useMembers();

  const currentRole = server?.members?.find(
    (member) => member.profileId === profileId
  )?.role;

  if (!server || !currentRole) {
    return null;
  }
  if (!isOpen) return null;

  return (
    <div className="w-60 flex flex-col  h-full p-4 gap-y-3 text-foreground bg-secondary-background">
      <div className="uppercase text-xs font-semibold pt-4 flex justify-between">
        <p>Members</p>
        <MemberTooltip server={server} role={currentRole} />
      </div>
      {server.members?.map(({ id, role, profile }) => (
        <MemberLink
          key={id}
          profile={profile}
          role={role}
          userProfileId={profileId}
        />
      ))}
    </div>
  );
};
