import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { Channel, ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import { ServerHeader } from "./ServerHeader";

interface ServerSidebarProps {
  serverId: string;
}

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
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

  const channels = server?.channels.reduce<{
    text: Channel[];
    audio: Channel[];
    video: Channel[];
  }>(
    (prevValue, curr) => {
      if (curr.type === ChannelType.TEXT) {
        prevValue.text.push(curr);
      } else if (curr.type === ChannelType.AUDIO) {
        prevValue.audio.push(curr);
      } else if (curr.type === ChannelType.VIDEO) {
        prevValue.video.push(curr);
      }
      return prevValue;
    },
    { text: [], audio: [], video: [] }
  );

  const members = server?.members.filter(
    (member) => member.profileId !== profile.id
  );

  const role = server?.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  if (!server) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col w-full h-full text-foreground dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
    </div>
  );
};
