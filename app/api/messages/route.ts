import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { Message } from "@prisma/client";
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
    const channelId = searchParams.get("channelId");

    if (!channelId) {
      return new NextResponse("Channel ID is missing", { status: 400 });
    }

    let messages: Message[] = [];
    if (cursor) {
      messages = await db.message.findMany({
        take: MESSAGE_BATCH,
        skip: Number(cursor),
        cursor: {
          id: cursor,
        },
        where: {
          channelId,
        },
        include: {
          member: {
            include: { profile: true },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    } else {
      messages = await db.message.findMany({
        take: MESSAGE_BATCH,
        where: {
          channelId,
        },
        include: {
          member: {
            include: { profile: true },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json({
      messages,
      nextCursor: getNextCursor(messages),
    });
  } catch (error) {
    console.error("[/api/messages] [POST]", error);
  }
};

const getNextCursor = (messages: Message[]) => {
  if (messages.length === MESSAGE_BATCH) {
    return messages[MESSAGE_BATCH - 1].id;
  } else {
    return null;
  }
};
