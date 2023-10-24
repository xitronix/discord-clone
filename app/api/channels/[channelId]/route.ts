import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { channelId: string } }
) => {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return NextResponse.json("Server ID not found", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: params.channelId,
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: { role: "asc" },
        },
      },
    });

    return NextResponse.json({ server });
  } catch (e) {
    console.error("[/api/channels/[channelId]] [DELETE]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { channelId: string } }
) => {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { name, type } = await req.json();

    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return NextResponse.json("Server ID not found", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          update: {
            where: {
              id: params.channelId,
            },
            data: { name, type },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: { role: "asc" },
        },
      },
    });

    return NextResponse.json({ server });
  } catch (e) {
    console.error("[/api/channels/[channelId]] [DELETE]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
