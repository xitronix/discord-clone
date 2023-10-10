import { db } from "../../../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, params: { id: string }) => {
  console.log("get", params);
  const id = request.url.split('/')[-1]
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
