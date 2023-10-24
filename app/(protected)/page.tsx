import { initialProfile } from "@/lib/initialProfile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { InitialModal } from "@/components/modals/InitialModal";

const SetupPage = async () => {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
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

  if (server && server.channels)
    return redirect(`/servers/${server.id}/${server.channels[0].id}`);

  if (!server) {
    return <InitialModal />;
  }

  return redirect(`/servers/${server.id}}`);
};

export default SetupPage;
