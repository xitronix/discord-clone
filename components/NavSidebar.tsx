import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import NavigationAction from "./NavigationAction";

export const NavSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) return;

  const servers = await db.server.findMany({
    where: {
      members: {
        some: { profileId: profile.id },
      },
    },
  });
  return (
    <div className="space-y-4 flex flex-col items-center h-full bg-secondary w-full py-3">
      <NavigationAction />
    </div>
  );
};
