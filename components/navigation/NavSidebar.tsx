import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import NavigationAction from "./NavigationAction";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { ThemeTogle } from "@/components/ui/ThemeTogle";
import { NavigationItem } from "./NavigationItem";
import { UserButton } from "@/components/UserButton";
import { NavigationDM } from "./NavigationDM";

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
      <NavigationDM />
      <NavigationAction />
      <Separator className="h-[2px] w-1/2" />
      <ScrollArea className="flex-1 w-full">
        {servers.map(({ imageUrl, id, name }) => (
          <NavigationItem key={id} id={id} name={name} imageUrl={imageUrl} />
        ))}
      </ScrollArea>
      <div className="pb-2 flex flex-col gap-y-4 items-center">
        <ThemeTogle />
        <UserButton />
      </div>
    </div>
  );
};
