import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const ServerIdPage = async ({
  params: { serverId },
}: {
  params: { serverId: string };
}) => {
  const profile = await currentProfile();

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: true,
    },
  });

  if (!server) {
    return redirect("/");
  }

  if (server && server.channels.length > 0)
    return redirect(`/servers/${server.id}/${server.channels[0].id}`);

  return (
    <div className="grid bg-secondary h-full px-20 md:px-20 pr-64 text-center align-middle items-center">
      You find yourself in a strange place. You don't have access to any text
      channels, or there are none in this server.
    </div>
  );
};

export default ServerIdPage;
