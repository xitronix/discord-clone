import { db } from "../../../../lib/db";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest, params: { id: string }) => {
  const id = request.url.split("/")[-1];
  const serverImage = await db.serverImage.findFirst({
    where: {
      id,
    },
  });
  return new Response(serverImage?.image, {
    headers: {
      "content-type": "document/*",
    },
  });
};
