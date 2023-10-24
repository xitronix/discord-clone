"use client";

import { useModal } from "@/hooks/useModalStore";
import { Channel, MemberRole } from "@prisma/client";
import { Plus, Settings, Trash } from "lucide-react";
import ActionTooltip from "@/components/ActionTooltip";
import { ChannelIcon } from "@/components/ChannelIcon";
import { ServerWithMembersWithProfile } from "../server/ServerHeader";

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
          key={channel.id}
          className="group h-8 flex w-full justify-start my-1 p-1.5 gap-x-2 cursor-pointer rounded-md text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
        >
          <ChannelIcon className="h-4 w-4 flex-shrink-0" type={channel.type} />
          {channel.name}
          {role !== MemberRole.GUEST && (
            <div className="ml-auto flex gap-x-1">
              <ActionTooltip label="edit channel" side="top">
                <Settings
                  onClick={() => onOpen("editChannel", { server, channel })}
                  className="h-4 w-4 hidden group-hover:block hover:text-primary-foreground transition"
                />
              </ActionTooltip>
              <ActionTooltip label="delete channel" side="top">
                <Trash
                  onClick={() => onOpen("deleteChannel", { server, channel })}
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
