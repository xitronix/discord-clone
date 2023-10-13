import { db } from "./db";
import { extractJwt } from "./extractJwt";

export const initialProfile = async () => {
  const { name, userId, picture, email } = extractJwt();

  const profile = await db.profile.findUnique({
    where: { userId },
  });

  if (profile) {
    return profile;
  }

  if (!email) {
    throw new Error("Email of user does not exist!");
  }

  const newProfile = await db.profile.create({
    data: {
      userId,
      name: `${name}`,
      imageUrl: picture,
      email,
    },
  });

  return newProfile;
};
