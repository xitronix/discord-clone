"use client";

import { auth } from "@/firebase/firebaseClient";
import { useAuth } from "@/context/Auth";
import { Button } from "./ui/button";

export const UserButton = () => {
  const { user } = useAuth();

  if (user) {
    return <Button onClick={() => auth.signOut()}>Log Out</Button>;
  } else {
    return null;
  }
};