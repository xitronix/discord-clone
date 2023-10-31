"use client";

import { Channel } from "@prisma/client";
import { ChannelIcon } from "../ChannelIcon";
import { Users2 } from "lucide-react";
import { useMembers } from "@/hooks/useMembers";

interface ChatHeaderProps {
  channel: Channel;
  children: React.ReactNode;
}

export const ChatHeader = ({ channel, children }: ChatHeaderProps) => {
  const { toggle } = useMembers();
  return (
    <div className="flex items-center font-semibold w-full px-3 h-12 border-b-2 border-secondary justify-between">
      <div className="flex gap-2">
        {children}
        <ChannelIcon className="h-5 w-5" type={channel.type} />
        <p className="flex items-center text-primary-foreground">
          {channel.name}
        </p>
      </div>
      <Users2 onClick={() => toggle()} className="h-6 w-6 fill-current" />
    </div>
  );
};
