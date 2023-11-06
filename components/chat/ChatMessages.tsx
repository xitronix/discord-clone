"use client";

import { Member, Message } from "@prisma/client";
import { ChatWelcome, ChatWelcomeProps } from "./ChatWelcome";
import { useChatQuery } from "@/hooks/useChatQuery";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment } from "react";
import { MembersWithProfile } from "@/types";
import { ChatMessage } from "./ChatMessage";
import { format } from "date-fns";

const DATE_FORMAT = "dd/MM/yyyy HH:mm";

type MessageWithMembersWithProfile = Message & {
  member: MembersWithProfile;
};

interface ChatMessagesProps extends ChatWelcomeProps {
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Array<{ key: string; value: string }>;
  paramKey: "channelId" | "dmChannelId";
  paramValue: string;
}

export const ChatMessages = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`;

  const { status, data } = useChatQuery({
    queryKey,
    apiUrl,
    paramKey,
    paramValue,
  });
  if (status === "pending") {
    return (
      <div className="flex flex-1 flex-col justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin" />
        <p>Loading messages</p>
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="flex flex-1 flex-col justify-center items-center">
        <ServerCrash className="h-10 w-10" />
        <p>Something went wrong</p>
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto">
      <div className="flex-1" />
      <ChatWelcome name={name} type={type} />
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((group, i) => {
          return (
            <Fragment key={i}>
              {group.items.map((message: MessageWithMembersWithProfile) => (
                <ChatMessage
                  key={message.id}
                  id={message.id}
                  content={message.content}
                  profile={message.member.profile}
                  role={message.member.role}
                  fileUrl={message.fileUrl}
                  deleted={message.deleted}
                  isUpdated={message.updatedAt !== message.createdAt}
                  timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                  socketUrl={socketUrl}
                  socketQuery={socketQuery}
                />
              ))}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
