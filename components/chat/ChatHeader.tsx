"use client";

import { Channel } from "@prisma/client";
import { ChannelIcon } from "../ChannelIcon";
import { Users2 } from "lucide-react";
import { useMembers } from "@/hooks/useMembers";

interface ChatHeaderProps {
  channel: Channel;
}

export const ChatHeader = ({ channel }: ChatHeaderProps) => {
  const { toggle } = useMembers();
  return (
    <div className="flex h-12 items-center justify-between border-b-2 border-secondary px-2">
      <div className="flex gap-2">
        <ChannelIcon className="h-5 w-5" type={channel.type} />
        <p className="text-primary-foreground">{channel.name}</p>
      </div>
      <Users2 onClick={() => toggle()} className="h-6 w-6 fill-current" />
    </div>
  );
};
