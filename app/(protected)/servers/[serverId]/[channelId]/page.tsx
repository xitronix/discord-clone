import { MobileToggle } from "@/components/MobileToggle";
import { ChannelHeader } from "@/components/chat/ChannelHeader";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { MediaRoom } from "@/components/media-room";
import { MembersSidebar } from "@/components/membersSidebar/MembersSidebar";
import { ServerSidebar } from "@/components/server/ServerSidebar";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

interface ChannelPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const ChannelPage = async ({ params }: ChannelPageProps) => {
  const profile = await currentProfile();
  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: { profile: true },
        orderBy: { role: "asc" },
      },
    },
  });
  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });
  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    return redirect("/");
  }
  return (
    <div className="h-full relative flex flex-col">
      <ChannelHeader channel={channel}>
        <MobileToggle>
          <ServerSidebar serverId={params.serverId} />
        </MobileToggle>
      </ChannelHeader>
      <div className="flex h-full overflow-auto">
        <div className="flex flex-col w-full">
          {channel.type === "TEXT" ? (
            <>
              <ChatMessages
                paramKey="channelId"
                paramValue={channel.id}
                chatId={channel.id}
                type="channel"
                userRole={member.role}
                userProfileId={profile.id}
                userMessageId={member.id}
                name={channel.name}
                socketQuery={[
                  { key: "channelId", value: channel.id },
                  { key: "serverId", value: channel.serverId },
                ]}
                socketUrl="/api/socket/messages"
                apiUrl="/api/messages"
              />
              <ChatInput
                name={channel.name}
                type="channel"
                apiUrl="/api/socket/messages"
                query={{
                  channelId: channel.id,
                  serverId: channel.serverId,
                }}
              />
            </>
          ) : (
            <MediaRoom
              channelId={channel.id}
              video={channel.type === ChannelType.VIDEO}
            />
          )}
        </div>
        <MembersSidebar server={server} profileId={profile.id} />
      </div>
    </div>
  );
};

export default ChannelPage;
