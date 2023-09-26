"use client"

import { Button } from "@/components/ui/button";
import { auth } from "../firebase";
export default function Home() {
  return (
    <div className="flex flex-col">
      <Button onClick={() => auth.signOut()}>Log Out</Button>
      <p className="text-3xl font-bold text-indigo-500">
        This is protected route
      </p>
    </div>
  );
}
