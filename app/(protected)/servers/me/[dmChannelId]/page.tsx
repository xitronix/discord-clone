import { getOrCreateDMChannel } from "@/lib/channel";
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
  });
  if (!dmChannel) {
    return redirect("/");
  }
  return (
    <div>
      DM <br />
      ChannelId {dmChannel.id} <br />
      Owner {dmChannel.ownerId}
      Recipient {dmChannel.ownerId}
    </div>
  );
};

export default MemberChatPage;
