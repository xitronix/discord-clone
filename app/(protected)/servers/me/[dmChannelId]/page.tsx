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
    <div>
      
      DM <br />
      ChannelId {dmChannel.id} <br />
      Me {profile.id}
      Recipient {otherProfile.id}
    </div>
  );
};

export default MemberChatPage;
