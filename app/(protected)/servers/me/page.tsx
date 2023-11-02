import { getAllDmChannels } from "@/lib/channel";
import { currentProfile } from "@/lib/currentProfile";
import { redirect } from "next/navigation";

export const DmRedirectPage = async () => {
  const profile = await currentProfile();

  const dmChannels = await getAllDmChannels(profile.id);

  if (dmChannels.length > 0) {
    return redirect(`/servers/me/${dmChannels[0].id}`);
  } else {
    return (
      <div className="grid bg-secondary h-full px-20 md:px-20 pr-64 text-center align-middle items-center">
        You don't have any opened direct messages.
      </div>
    );
  }
};

export default DmRedirectPage;
