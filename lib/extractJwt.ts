import jwtDecode from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const extractJwt = () => {
  const jwt = cookies().get("jwt");
  if (!jwt?.value) {
    return redirect("/login");
  }

  const { user_id: userId, ...decodedJwt } = jwtDecode(jwt?.value) as {
    email: string;
    picture: string;
    name: "string";
    user_id: "string";
  };

  return { ...decodedJwt, userId };
};
