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
    const { serverId, channelId } = req.query;

    if (!profile) {
      return res.status(401).json({ error: "Unauthorised" });
    }

    if (!serverId) {
      return res.status(400).json({ error: "ServerId is missing" });
    }

    if (!channelId) {
      return res.status(400).json({ error: "ChannelId is missing" });
    }

    if (!content && !fileUrl) {
      return res.status(400).json({ error: "Content or fileUrl is required" });
    }

    const server = await db.server.findUnique({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        members: true,
      },
    });

    if (!server) {
      return res.status(404).json({ error: "Server not found" });
    }

    const channel = db.channel.findUnique({
      where: {
        id: channelId as string,
        serverId: serverId as string,
      },
    });

    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    const member = server.members.find(
      (member) => member.profileId === profile.id
    );

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    const message = await db.message.create({
      data: {
        content,
        fileUrl,
        channelId: channelId as string,
        memberId: member.id,
      },
      include: {
        member: {
          include: { profile: true },
        },
      },
    });

    const channelKey = `chat:${channelId}:messages`;

    res.socket?.server?.io?.emit(channelKey, message);

    return res.status(200).json(message);
  } catch (error) {
    console.error("[/api/socket/messages] [POST]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}
