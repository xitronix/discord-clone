"use client";

import { auth } from "@/app/firebase";
import { Button } from "@/components/ui/button";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import Link from "next/link";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p>Email:</p>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="flex flex-col gap-2">
        <p>Password:</p>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button
        onClick={async () => {
          await signInWithEmailAndPassword(auth, email, password);
        }}
      >
        Log In
      </Button>
      <Button onClick={signInWithGoogle}>Connect with Google</Button>
      <Button asChild variant="link">
        <Link href="/register">Doesn' t have account yet?</Link>
      </Button>
    </div>
  );
};

export default LoginPage;
