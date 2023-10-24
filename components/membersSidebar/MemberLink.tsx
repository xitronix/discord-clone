"use client";

import { MemberRole, Profile } from "@prisma/client";
import { Member } from "../Member";
import { UserAvatar } from "../UserAvatar";
import { useRouter } from "next/navigation";

interface MemberLinkProps {
  profile: Pick<Profile, "id" | "imageUrl" | "email" | "name">;
  role: MemberRole;
  memberId: string;
}

export const MemberLink = ({ profile, role, memberId }: MemberLinkProps) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/servers/me/${memberId}`)}
      className="flex justify-start items-center gap-3"
    >
      <UserAvatar
        className="md:h-8 md:w-8"
        src={profile.imageUrl}
        name={profile.email}
      />
      <Member
        className="text-ellipsis overflow-hidden whitespace-nowrap w-32 text-sm"
        name={profile.name}
        role={role}
      />
    </div>
  );
};
