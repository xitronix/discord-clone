import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { DmChannelHeader } from "@/components/dm/DMChannelHeader";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const MemberChatPage = async ({
  params,
}: {
  params: { dmChannelId: string };
}) => {
  const profile = await currentProfile();
  const dmChannel = await db.dMChannel.findUnique({
    where: {
      id: params.dmChannelId,
      OR: [{ ownerId: profile.id }, { recipientId: profile.id }],
    },
    include: {
      owner: true,
      recipient: true,
    },
  });

  if (!dmChannel) {
    return redirect("/");
  }

  const { owner, recipient } = dmChannel;

  const otherProfile = owner.id === profile.id ? recipient : owner;
  return (
    <div className="flex flex-col h-full w-full">
      <ChatMessages
        paramValue={dmChannel.id}
        chatId={dmChannel.id}
        type="dm"
        name={otherProfile.name}
        member={{} as any}
        socketQuery={[{ key: "channelId", value: dmChannel.id }]}
        socketUrl="/api/socket/dm-messages"
        apiUrl="/api/dm-messages"
      />
      <ChatInput
        name={otherProfile.name}
        type="dm"
        apiUrl="/api/socket/messages"
        query={{
          channelId: dmChannel.id,
        }}
      />
    </div>
  );
};

export default MemberChatPage;
