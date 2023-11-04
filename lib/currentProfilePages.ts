import { db } from "@/lib/db";
import jwtDecode from "jwt-decode";
import { NextApiRequest } from "next";

export const currentProfilePages = async (req: NextApiRequest) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    return null;
  }

  const { user_id: userId } = jwtDecode(jwt) as {
    user_id: "string";
  };

  const profile = await db.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    return null;
  }

  return profile;
};
