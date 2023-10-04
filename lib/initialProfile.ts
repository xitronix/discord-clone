import { cookies } from "next/headers";
import jwtDecode from "jwt-decode";
import { db } from "./db";
import { redirect } from "next/navigation";

export const initialProfile = async () => {
  const jwt = cookies().get("jwt");
  if (!jwt?.value) {
    return redirect("/login");
  }

  const decodedJwt = jwtDecode(jwt?.value) as {
    email: string;
    picture: string;
    name: "string";
    user_id: "string";
  };

  const profile = await db.profile.findUnique({
    where: { userId: decodedJwt.user_id },
  });

  if (profile) {
    return profile;
  }

  if (!decodedJwt.email) {
    throw new Error("Email of user does not exist!");
  }

  const newProfile = await db.profile.create({
    data: {
      userId: decodedJwt.user_id,
      name: `${decodedJwt.name}`,
      imageUrl: decodedJwt.picture,
      email: decodedJwt.email,
    },
  });

  return newProfile;
};
