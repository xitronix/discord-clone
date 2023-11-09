import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { DirectMessage, Message } from "@prisma/client";
import { NextResponse } from "next/server";

const MESSAGE_BATCH = 20;

export const GET = async (req: Request) => {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);

    const cursor = searchParams.get("cursor");
    const dmChannelId = searchParams.get("dmChannelId");

    if (!dmChannelId) {
      return new NextResponse("Direct Channel ID is missing", { status: 400 });
    }

    let directMessages: DirectMessage[] = [];
    if (cursor) {
      directMessages = await db.directMessage.findMany({
        take: MESSAGE_BATCH,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
          dmChannelId,
        },
        include: { profile: true },
        orderBy: { createdAt: "desc" },
      });
    } else {
      directMessages = await db.directMessage.findMany({
        take: MESSAGE_BATCH,
        where: {
          dmChannelId,
        },
        include: { profile: true },
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json({
      messages: directMessages,
      nextCursor: getNextCursor(directMessages),
    });
  } catch (error) {
    console.error("[/api/direct-messages] [GET]", error);
  }
};

const getNextCursor = (directMessage: DirectMessage[]) => {
  if (directMessage.length === MESSAGE_BATCH) {
    return directMessage[MESSAGE_BATCH - 1].id;
  } else {
    return null;
  }
};
