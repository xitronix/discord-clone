import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { MediaRoom } from "@/components/media-room";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const MemberChatPage = async ({
  params,
  searchParams,
}: {
  params: { dmChannelId: string };
  searchParams: { video: boolean };
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
    <div className="flex flex-col h-full w-full overflow-auto">
      {!searchParams.video && (
        <>
          <ChatMessages
            paramKey={"dmChannelId"}
            paramValue={dmChannel.id}
            chatId={dmChannel.id}
            type="dm"
            name={otherProfile.name}
            userProfileId={profile.id}
            userMessageId={profile.id}
            userRole="ADMIN"
            socketQuery={[{ key: "dmChannelId", value: dmChannel.id }]}
            socketUrl="/api/socket/direct-messages"
            apiUrl="/api/direct-messages"
          />
          <ChatInput
            name={otherProfile.name}
            type="dm"
            apiUrl="/api/socket/direct-messages"
            query={{
              dmChannelId: dmChannel.id,
            }}
          />
        </>
      )}
      {searchParams.video && <MediaRoom channelId={dmChannel.id} video />}
    </div>
  );
};

export default MemberChatPage;
