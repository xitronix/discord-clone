"use client";

import { useModal } from "@/hooks/useModalStore";
import { Channel, MemberRole } from "@prisma/client";
import { Plus, Settings } from "lucide-react";
import ActionTooltip from "@/components/ActionTooltip";
import { ChannelIcon } from "@/components/ChannelIcon";
import { ServerWithMembersWithProfile } from "../server/ServerHeader";

export const ChannelsSection = ({
  channels,
  title,
  role,
  server,
}: {
  channels?: Pick<Channel, "name" | "id" | "type">[];
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
      {channels?.map(({ name, id, type }) => (
        <div
          key={id}
          className="group h-10 flex w-full justify-start my-1 p-2 gap-x-2 cursor-pointer rounded-md text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
        >
          <ChannelIcon className="h-4 w-4 flex-shrink-0" type={type} />
          {name}
          {role !== MemberRole.GUEST && (
            <div className="ml-auto flex">
              <ActionTooltip label="edit channel" side="top">
                <Settings className="h-4 w-4 hidden group-hover:block hover:text-primary-foreground" />
              </ActionTooltip>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
