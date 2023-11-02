"use client";

import { MemberRole, Profile } from "@prisma/client";
import { Member } from "../Member";
import { UserAvatar } from "../UserAvatar";
import { useRouter } from "next/navigation";
import { cn } from "@/lib";

interface MemberLinkProps {
  userProfileId: string;
  profile: Pick<Profile, "id" | "imageUrl" | "email" | "name">;
  role?: MemberRole;
  className?: string;
}

export const MemberLink = ({
  profile,
  role,
  userProfileId,
  className,
}: MemberLinkProps) => {
  const router = useRouter();
  return (
    <div
      onClick={async () => {
        try {
          const response = await fetch("/api/dm-channels", {
            body: JSON.stringify({
              ownerId: userProfileId,
              recipientId: profile.id,
            }),
            method: "POST",
          });
          const dmChannel = await response.json();
          router.push(`/servers/me/${dmChannel.id}`);
        } catch (e) {
          console.error("Canot create dm channel");
        }
      }}
      className={cn("flex justify-start items-center gap-3", className)}
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
