import { currentProfile } from "@/lib/currentProfile";
import { cn } from "@/lib";
import { MemberLink } from "../membersSidebar/MemberLink";
import { DMChannel, Profile } from "@prisma/client";

export type DMChannelWithProfile = DMChannel & {
  owner: Profile;
  recipient: Profile;
};

interface DmSidebarProps {
  dmChannels: DMChannelWithProfile[];
  dmChannelId: string;
}

export const DmSidebar = async ({
  dmChannels,
  dmChannelId,
}: DmSidebarProps) => {
  const profile = await currentProfile();
  return (
    <div className="flex flex-col w-full h-full text-foreground bg-secondary-background">
      {dmChannels.map((dmChannel) => {
        const otherProfile =
          dmChannel.owner.id === profile.id
            ? dmChannel.recipient
            : dmChannel.owner;
        return (
          <MemberLink
            key={dmChannel.id}
            userProfileId={profile.id}
            profile={otherProfile}
            className={cn(
              "group flex w-full justify-start p-2 gap-x-2 cursor-pointer rounded-md text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 hover:bg-accent/30 hover:text-accent-foreground",
              dmChannelId === dmChannel.id &&
                "hover:bg-accent/50 bg-accent/50 text-white"
            )}
          />
        );
      })}
    </div>
  );
};
