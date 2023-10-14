import { db } from "@/lib/db";
import { extractJwt } from "./extractJwt";
import { redirect } from "next/navigation";

export const currentProfile = async () => {
  const { userId } = extractJwt();

  const profile = await db.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    return redirect("/login");
  }

  return profile;
};
