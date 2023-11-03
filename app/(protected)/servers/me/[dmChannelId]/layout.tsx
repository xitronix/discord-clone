import { MobileToggle } from "@/components/MobileToggle";
import { DmChannelHeader } from "@/components/dm/DMChannelHeader";
import { DmSidebar } from "@/components/dm/DmSidebar";
import { getAllDmChannels } from "@/lib/channel";
import { currentProfile } from "@/lib/currentProfile";
import { redirect } from "next/navigation";

const DmChannelLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { dmChannelId: string };
}) => {
  const profile = await currentProfile();

  const dmChannels = await getAllDmChannels(profile.id);

  const currentChannel = dmChannels.find(
    ({ owner, recipient }) =>
      owner.id === profile.id || recipient.id === profile.id
  );

  if (dmChannels.length === 0 || !currentChannel) {
    return redirect("/");
  }

  const { owner, recipient } = currentChannel;

  const otherProfile = owner.id === profile.id ? recipient : owner;
  return (
    <div className="h-full flex">
      <div className="fixed hidden md:flex z-20 w-60 flex-col inset-y-0">
        <DmSidebar dmChannelId={params.dmChannelId} dmChannels={dmChannels} />
      </div>
      <main className="h-full md:pl-60 w-full flex flex-col">
        <DmChannelHeader
          name={otherProfile.name || otherProfile.email}
          imageUrl={otherProfile.imageUrl}
        >
          <MobileToggle>
            <DmSidebar
              dmChannelId={params.dmChannelId}
              dmChannels={dmChannels}
            />
          </MobileToggle>
        </DmChannelHeader>
        {children}
      </main>
    </div>
  );
};

export default DmChannelLayout;
