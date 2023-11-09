import { currentProfilePages } from "@/lib/currentProfilePages";
import { db } from "@/lib/db";
import { NextApiRequest } from "next/types";
import { NextApiResonseServerIo } from "../io";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResonseServerIo
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method is not allowed" });
  }
  try {
    const profile = await currentProfilePages(req);
    const { content, fileUrl } = JSON.parse(req.body);
    const { dmChannelId } = req.query;

    if (!profile) {
      return res.status(401).json({ error: "Unauthorised" });
    }

    if (!dmChannelId) {
      return res.status(400).json({ error: "DmChannelId is missing" });
    }

    if (!content && !fileUrl) {
      return res.status(400).json({ error: "Content or fileUrl is required" });
    }

    const dMChannel = await db.dMChannel.findUnique({
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
      include: {
        owner: true,
        recipient: true,
      },
    });

    if (!dMChannel) {
      return res.status(404).json({ error: "Direct channel not found" });
    }

    const message = await db.directMessage.create({
      data: {
        content,
        fileUrl,
        dmChannelId: dMChannel.id,
        profileId: profile.id,
      },
      include: {
        profile: true,
      },
    });

    const channelKey = `chat:${dmChannelId}:messages`;

    res.socket?.server?.io?.emit(channelKey, message);

    return res.status(200).json(message);
  } catch (error) {
    console.error("[/api/socket/direct-messages] [POST]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}
