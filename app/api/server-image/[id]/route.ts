import { db } from "../../../../lib/db";
import { NextRequest } from "next/server";

export const GET = async (
  _: NextRequest,
  { params }: { params: { id: string } }
) => {
  const serverImage = await db.serverImage.findFirst({
    where: {
      id: params.id,
    },
  });
  return new Response(serverImage?.image, {
    headers: {
      "content-type": "document/*",
    },
  });
};
