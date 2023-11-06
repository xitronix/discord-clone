"use client";

import { Member } from "@prisma/client";
import { ChatWelcome, ChatWelcomeProps } from "./ChatWelcome";

interface ChatMessagesProps extends ChatWelcomeProps {
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Array<{ key: string; value: string }>;
  // paramkey: "channelId" | "dmChannelId";
  paramValue: string;
}

export const ChatMessages = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramValue,
  type,
}: ChatMessagesProps) => {
  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto">
      <div className="flex-1"/>
      <ChatWelcome name={name} type={type} />
    </div>
  );
};
