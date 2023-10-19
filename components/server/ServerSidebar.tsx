import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { Channel, ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import { ServerHeader } from "./ServerHeader";
import { ChannelIcon } from "../ChannelIcon";

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
    voice: Channel[];
    video: Channel[];
  }>(
    (prevValue, curr) => {
      if (curr.type === ChannelType.TEXT) {
        prevValue.text.push(curr);
      } else if (curr.type === ChannelType.VOICE) {
        prevValue.voice.push(curr);
      } else if (curr.type === ChannelType.VIDEO) {
        prevValue.video.push(curr);
      }
      return prevValue;
    },
    { text: [], voice: [], video: [] }
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
    <div className="flex flex-col w-full h-full p-0 text-foreground dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
      <div className="p-2">
        <Channels title="Text channels" channels={channels?.text} />
        <Channels title="Voice channels" channels={channels?.voice} />
        <Channels title="Video channels" channels={channels?.video} />
      </div>
    </div>
  );
};

const Channels = ({
  channels,
  title,
}: {
  channels?: Channel[];
  title: string;
}) => {
  return (
    <div>
      <div className="uppercase text-xs font-bold pt-4">{title}</div>
      {channels?.map(({ name, id, type }) => (
        <div key={id} className="flex py-1 px-2 gap-2">
          <ChannelIcon className="h-4 w-4" type={type} /> {name}
        </div>
      ))}
    </div>
  );
};
