import { NextApiRequest } from "next";
import { NextApiResonseServerIo } from "../io";
import { currentProfilePages } from "@/lib/currentProfilePages";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResonseServerIo
) {
  if (req.method !== "DELETE" && req.method !== "PATCH") {
    return res.status(405).json({ error: "Method is not allowed" });
  }

  try {
    const profile = await currentProfilePages(req);
    const { directMessageId, dmChannelId } = req.query;
    const { content } = JSON.parse(req.body || "{}");

    if (!profile) {
      return res.status(401).json({ error: "Unauthorised" });
    }

    if (!directMessageId) {
      return res.status(400).json({ error: "Direct Channel Id is missing" });
    }

    const dmChannel = await db.dMChannel.findFirst({
      where: {
        id: dmChannelId as string,
        OR: [
          {
            ownerId: profile.id,
          },
          {
            recipientId: profile.id,
          },
        ],
      },
    });

    if (!dmChannel) {
      return res.status(404).json({ error: "DMChannel not found" });
    }

    let directMessage = await db.directMessage.findFirst({
      where: {
        id: directMessageId as string,
        dmChannelId: dmChannel.id,
      },
      include: {
        profile: true,
      },
    });

    if (!directMessage || directMessage.deleted) {
      return res.status(404).json({ error: "Message not found" });
    }

    const isMessageOwner = directMessage.profile.id === profile.id;

    if (!isMessageOwner) {
      return res.status(401).json({ error: "Unauthorised" });
    }
    if (req.method === "DELETE") {
      directMessage = await db.directMessage.update({
        where: {
          id: directMessage.id,
        },
        data: {
          deleted: true,
        },
        include: {
          profile: true,
        },
      });
    }
    if (req.method === "PATCH") {
      directMessage = await db.directMessage.update({
        where: {
          id: directMessage.id,
        },
        data: {
          content,
        },
        include: {
          profile: true,
        },
      });
    }

    const updateKey = `chat:${dmChannel.id}:messages:update`;

    res?.socket?.server?.io?.emit(updateKey, directMessage);
    return res.status(200).json({ message: directMessage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Error" });
  }
}
