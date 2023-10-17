"use server";

import { cookies } from "next/headers";

export async function setJwt(jwt: string) {
  cookies().set("jwt", jwt);
}
