import { getOrCreateDMChannel } from "@/lib/channel";
import { currentProfile } from "@/lib/currentProfile";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { ownerId, recipientId } = await req.json();
    const profile = await currentProfile();

    if (!profile || profile.id != ownerId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const dmChannel = await getOrCreateDMChannel(ownerId, recipientId);

    return NextResponse.json(dmChannel);
  } catch (e) {
    console.error("[/api/dm-channels(post)]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
