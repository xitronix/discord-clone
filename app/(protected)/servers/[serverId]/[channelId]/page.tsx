import { MobileToggle } from "@/components/MobileToggle";
import { ChannelHeader } from "@/components/chat/ChannelHeader";
import { MembersSidebar } from "@/components/membersSidebar/MembersSidebar";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
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
    <div className="h-full flex flex-col">
      <ChannelHeader channel={channel}>
        <MobileToggle serverId={params.serverId} />
      </ChannelHeader>
      <div className="flex h-full">
        <div className="w-full">
          Channel Page <br />
          ServerId {params.serverId}
          ChannelId {params.channelId}
        </div>
        <MembersSidebar server={server} profileId={profile.id} />
      </div>
    </div>
  );
};

export default ChannelPage;
