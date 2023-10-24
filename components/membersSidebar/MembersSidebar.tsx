import { currentProfile } from "@/lib/currentProfile";
import { Member } from "../Member";
import { MemberTooltip } from "./MemberTooltip";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { UserAvatar } from "../UserAvatar";
import { MemberLink } from "./MemberLink";

interface MembersSidebarProps {
  serverId: string;
}

export const MembersSidebar = async ({ serverId }: MembersSidebarProps) => {
  const profile = await currentProfile();
  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: { profile: true },
        orderBy: { role: "asc" },
      },
    },
  });

  const role = server?.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  if (!server || !role) {
    return redirect("/");
  }

  return (
    <div className="fixed md:flex z-20 w-60 flex-col right-0 inset-y-0">
      <div className="flex flex-col w-full h-full p-4 gap-y-3 text-foreground bg-secondary-background">
        <div className="uppercase text-xs font-semibold pt-4 flex justify-between">
          <p>Members</p>
          <MemberTooltip server={server} role={role} />
        </div>
        {server.members?.map(({ id, role, profile }) => (
          <MemberLink key={id} profile={profile} role={role} memberId={id} />
        ))}
      </div>
    </div>
  );
};
