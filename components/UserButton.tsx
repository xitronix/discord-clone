"use client";

import { auth } from "@/firebase/firebaseClient";
import { useAuth } from "@/context/Auth";
import { Button } from "./ui/button";

export const UserButton = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <Button
        className="rounded-full w-12 h-12 overflow-hidden flex items-center justify-center"
        onClick={() => auth.signOut()}
      >
        Log Out
      </Button>
    );
  } else {
    return null;
  }
};
