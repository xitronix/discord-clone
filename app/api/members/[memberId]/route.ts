import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params: { memberId } }: { params: { memberId: string } }
) => {
  try {
    const profile = await currentProfile();
    const { role } = await req.json();
    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get("serverId");
    if (!serverId) {
      return NextResponse.json("Server ID not found", { status: 400 });
    }

    if (!memberId) {
      return NextResponse.json("Member ID not found", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: memberId,
              profileId: {
                not: profile.id,
              },
            },
            data: {
              role,
            },
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
    return NextResponse.json(server);
  } catch (e) {
    console.error("[/api/members/[memberId]] [PATCH]", e);
    return NextResponse.json("Internal Error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params: { memberId } }: { params: { memberId: string } }
) => {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get("serverId");
    if (!serverId) {
      return NextResponse.json("Server ID not found", { status: 400 });
    }

    if (!memberId) {
      return NextResponse.json("Member ID not found", { status: 400 });
    }
    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          delete: {
            id: memberId,
            profileId: {
              not: profile.id,
            },
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
    return NextResponse.json(server);
  } catch (e) {
    console.error("[/api/members/[memberId]] [DELETE]", e);
    return NextResponse.json("Internal Error", { status: 500 });
  }
};
