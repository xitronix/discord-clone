"use client";

import { ModalType, useModal } from "@/hooks/useModalStore";
import { Channel, MemberRole } from "@prisma/client";
import { Plus, Settings, Trash } from "lucide-react";
import ActionTooltip from "@/components/ActionTooltip";
import { ChannelIcon } from "@/components/ChannelIcon";
import { ServerWithMembersWithProfile } from "../server/ServerHeader";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib";

export const ChannelsSection = ({
  channels,
  title,
  role,
  server,
}: {
  channels?: Channel[];
  title: string;
  role: MemberRole;
  server: ServerWithMembersWithProfile;
}) => {
  const onOpen = useModal((state) => state.onOpen);
  const router = useRouter();
  const params = useParams();

  const onClick = (channelId: string) => {
    router.push(`/servers/${server?.id}/${channelId}`);
  };

  const onAction = (
    event: React.MouseEvent,
    action: ModalType,
    channel: Channel
  ) => {
    event.stopPropagation();
    onOpen(action, { server, channel });
  };

  return (
    <div>
      <div className="uppercase text-xs font-semibold pt-4 flex justify-between">
        <p>{title}</p>
        {role !== MemberRole.GUEST && (
          <ActionTooltip side="top" align="center" label="create channel">
            <Plus
              onClick={() => onOpen("createChannel", { server })}
              className="h-4 w-4"
            />
          </ActionTooltip>
        )}
      </div>
      {channels?.map((channel) => (
        <div
          onClick={() => onClick(channel.id)}
          key={channel.id}
          className={cn(
            "group h-8 flex w-full justify-start my-1 p-1.5 gap-x-2 cursor-pointer rounded-md text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 hover:bg-accent/30 hover:text-accent-foreground",
            params.channelId === channel.id && "hover:bg-accent/50 bg-accent/50 text-white"
          )}
        >
          <ChannelIcon className="h-4 w-4 flex-shrink-0" type={channel.type} />
          {channel.name}
          {role !== MemberRole.GUEST && (
            <div className="ml-auto flex gap-x-1">
              <ActionTooltip label="edit channel" side="top">
                <Settings
                  onClick={(e) => onAction(e, "editChannel", channel)}
                  className="h-4 w-4 hidden group-hover:block hover:text-primary-foreground transition"
                />
              </ActionTooltip>
              <ActionTooltip label="delete channel" side="top">
                <Trash
                  onClick={(e) => onAction(e, "deleteChannel", channel)}
                  className="h-4 w-4 hidden group-hover:block hover:text-primary-foreground transition"
                />
              </ActionTooltip>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
