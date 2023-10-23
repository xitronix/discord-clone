"use client";

import { useModal } from "@/hooks/useModalStore";
import { Channel, MemberRole } from "@prisma/client";
import { Plus } from "lucide-react";
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
        <div key={id} className="flex py-1 px-2 gap-2">
          <ChannelIcon className="h-4 w-4" type={type} /> {name}
        </div>
      ))}
    </div>
  );
};
