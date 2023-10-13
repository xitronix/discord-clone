import { db } from "../../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;
  if (!file) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  console.log(file);

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const { id } = await db.serverImage.create({
    data: {
      image: buffer,
    },
  });
  const imageUrl = `${request.url}/${id}`;
  return NextResponse.json({ success: true, imageUrl });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
  maxDuration: 5,
};
