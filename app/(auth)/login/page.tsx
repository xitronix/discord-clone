"use client";

import { auth } from "@/app/firebase";
import { Button } from "@/components/ui/button";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    router.push("/");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p>Email:</p>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="flex flex-col gap-2">
        <p>Password:</p>
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button
        onClick={async () => {
          await signInWithEmailAndPassword(auth, email, password);
          router.push("/");
        }}
      >
        Log In
      </Button>
      <Button onClick={signInWithGoogle}>Connect with Google</Button>
    </div>
  );
};

export default LoginPage;
