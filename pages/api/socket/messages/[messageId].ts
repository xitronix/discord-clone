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
    const { messageId, serverId, channelId } = req.query;
    const { content } = JSON.parse(req.body);

    if (!profile) {
      return res.status(401).json({ error: "Unauthorised" });
    }

    if (!serverId) {
      return res.status(400).json({ error: "ServerId is missing" });
    }

    if (!channelId) {
      return res.status(400).json({ error: "Chanel is missing" });
    }

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        members: { where: { profileId: profile.id } },
        channels: { where: { id: channelId as string } },
      },
    });

    if (!server) {
      return res.status(404).json({ error: "Server not found" });
    }

    const channel = server.channels[0];
    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    const member = server.members[0];
    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    let message = await db.message.findFirst({
      where: {
        id: messageId as string,
        channelId: channel.id,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!message || message.deleted) {
      return res.status(404).json({ error: "Messages not found" });
    }

    const isMessageOwner = message.memberId === member.id;

    const canModify =
      isMessageOwner ||
      member.role === MemberRole.ADMIN ||
      member.role === MemberRole.MODERATOR;

    if (!canModify) {
      return res.status(401).json({ error: "Unauthorised" });
    }
    if (req.method === "DELETE") {
      message = await db.message.update({
        where: {
          id: message.id,
        },
        data: {
          deleted: true,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      });
    }
    if (req.method === "PATCH") {
      if (!isMessageOwner) {
        return res.status(401).json({ error: "Unauthorised" });
      }

      message = await db.message.update({
        where: {
          id: message.id,
        },
        data: {
          content,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      });
    }

    const updateKey = `chat:${channelId}:messages:update`;

    res?.socket?.server?.io?.emit(updateKey, message);
    return res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Error" });
  }
}
