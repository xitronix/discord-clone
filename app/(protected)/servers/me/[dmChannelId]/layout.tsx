import { DmSidebar } from "@/components/dm/DmSidebar";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const DmChannelLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { dmChannelId: string };
}) => {
  const profile = await currentProfile();

  const dmChannels = await db.dMChannel.findMany({
    where: {
      OR: [{ ownerId: profile.id }, { recipientId: profile.id }],
    },
    include: {
      owner: true,
      recipient: true,
    },
  });

  if (dmChannels.length === 0) {
    redirect("/");
  }

  return (
    <div className="h-full flex">
      <div className="fixed hidden md:flex z-20 w-60 flex-col inset-y-0">
        <DmSidebar dmChannelId={params.dmChannelId} dmChannels={dmChannels} />
      </div>
      <main className="h-full md:pl-60 w-full">{children}</main>
    </div>
  );
};

export default DmChannelLayout;
