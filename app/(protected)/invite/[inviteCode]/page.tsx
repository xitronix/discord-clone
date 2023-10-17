import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const InvitePage = async ({
  params: { inviteCode },
}: {
  params: { inviteCode: string };
}) => {
  const profile = await currentProfile();

  const memberedServer = await db.server.findFirst({
    where: {
      inviteCode,
      members: {
        some: { profileId: profile.id },
      },
    },
  });
  if (memberedServer) {
    return redirect(`/servers/${memberedServer.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode,
    },
    data: {
      members: {
        create: {
          profileId: profile.id,
        },
      },
    },
  });

  return redirect(`/servers/${server.id}`);
};

export default InvitePage;
