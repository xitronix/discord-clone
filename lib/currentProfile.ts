import { db } from "@/lib/db";
import { extractJwt } from "./extractJwt";

export const currentProfile = async () => {
  const { userId } = extractJwt();

  const profile = await db.profile.findUnique({
    where: { userId },
  });

  return profile;
};
