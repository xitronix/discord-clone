import { MembersSidebar } from "@/components/membersSidebar/MembersSidebar";
import { ServerSidebar } from "@/components/server/ServerSidebar";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
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
  });

  if (!server) {
    redirect("/");
  }

  return (
    <div className="h-full">
      <div className="fixed hidden md:flex z-20 w-60 flex-col inset-y-0">
        <ServerSidebar serverId={server.id} />
      </div>
      <main className="h-full md:px-60">{children}</main>
      <MembersSidebar serverId={server.id} />
    </div>
  );
};

export default ServerIdLayout;
