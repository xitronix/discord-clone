"use client";

import { MemberRole, Message } from "@prisma/client";
import { ChatWelcome, ChatWelcomeProps } from "./ChatWelcome";
import { useChatQuery } from "@/hooks/useChatQuery";
import { Loader2, ServerCrash } from "lucide-react";
import { ElementRef, Fragment, useRef } from "react";
import { MessageWithMembersWithProfile } from "@/types";
import { ChatMessage } from "./ChatMessage";
import { format } from "date-fns";
import { useChatSocket } from "@/hooks/useChatSocket";
import { useChatScroll } from "@/hooks/useChatScroll";
import { Button } from "@/components/ui/button";

const DATE_FORMAT = "dd/MM/yyyy HH:mm";

interface ChatMessagesProps extends ChatWelcomeProps {
  userRole: MemberRole;
  userProfileId: string;
  userMessageId: string;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Array<{ key: string; value: string }>;
  paramKey: "channelId" | "dmChannelId";
  paramValue: string;
}

export const ChatMessages = ({
  name,
  userRole,
  userProfileId,
  userMessageId,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`;
  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  const { status, data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue,
    });

  useChatSocket({
    queryKey,
    addKey: `${queryKey}:messages`,
    updateKey: `${queryKey}:messages:update`,
  });

  useChatScroll({
    chatRef,
    bottomRef,
    count: data?.pages?.[0]?.messages?.length ?? 0,
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
    <div
      ref={chatRef}
      onScroll={(e) => {
        const shouldLoadMore = !isFetchingNextPage && !!hasNextPage;
        const target = e.currentTarget;
        const scrollHeight = target.scrollHeight;

        if (target.scrollTop === 0 && shouldLoadMore) {
          fetchNextPage().then(() => {
            setTimeout(() => {
              target.scrollTo({
                top: target.scrollHeight - scrollHeight,
              });
            });
          });
        }
      }}
      className="flex-1 flex flex-col py-4 overflow-y-scroll"
    >
      {!hasNextPage && (
        <>
          <div className="flex-1" />
          <ChatWelcome name={name} type={type} />
        </>
      )}
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage && (
            <Loader2 className="h-6 w-6 animate-spin m-4" />
          )}
        </div>
      )}
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((group, i) => {
          return (
            <Fragment key={i}>
              {group.messages.map((message: MessageWithMembersWithProfile) => (
                <ChatMessage
                  key={message.id}
                  id={message.id}
                  content={message.content}
                  profile={message.member.profile}
                  userRole={userRole}
                  userProfileId={userProfileId}
                  isOwner={message.member.id === userMessageId}
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
      <div ref={bottomRef} />
    </div>
  );
};
