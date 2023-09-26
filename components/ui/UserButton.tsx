"use client";

import { auth } from "@/app/firebase";
import { useAuth } from "@/context/Auth";
import { Button } from "./button";

export const UserButton = () => {
  const { user } = useAuth();

  if (user) {
    return <Button onClick={() => auth.signOut()}>Log Out</Button>;
  } else {
    return null;
  }
};
