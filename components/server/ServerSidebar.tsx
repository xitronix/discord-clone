import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { Channel, ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import { ServerHeader } from "./ServerHeader";
import { ChannelIcon } from "../ChannelIcon";
import { ScrollArea } from "../ui/ScrollArea";
import { ServerSearch } from "./ServerSearch";
import { RoleIcon } from "../RoleIcon";
import { Separator } from "../ui/separator";
import { ChannelsSection } from "../modals/ChannelsSection";

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

  if (!server || !role) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col w-full h-full p-0 text-foreground dark:bg-secondary-background bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
      <ScrollArea>
        <div className="p-2">
          <ServerSearch
            data={[
              {
                type: "channel",
                label: "Text",
                data: channels?.text.map(({ id, name, type }) => ({
                  icon: <ChannelIcon type={type} />,
                  id,
                  name,
                })),
              },
              {
                type: "channel",
                label: "Voice",
                data: channels?.voice.map(({ id, name, type }) => ({
                  icon: <ChannelIcon type={type} />,
                  id,
                  name,
                })),
              },
              {
                type: "channel",
                label: "Video",
                data: channels?.video.map(({ id, name, type }) => ({
                  icon: <ChannelIcon type={type} />,
                  id,
                  name,
                })),
              },
              {
                type: "member",
                label: "Members",
                data: members?.map(({ id, profile, role }) => ({
                  icon: <RoleIcon role={role} />,
                  id,
                  name: profile.name,
                })),
              },
            ]}
          />
          <Separator className="mt-2" />
          <ChannelsSection
            server={server}
            role={role}
            title="Text channels"
            channels={channels?.text}
          />
          <ChannelsSection
            server={server}
            role={role}
            title="Voice channels"
            channels={channels?.voice}
          />
          <ChannelsSection
            server={server}
            role={role}
            title="Video channels"
            channels={channels?.video}
          />
        </div>
      </ScrollArea>
    </div>
  );
};
