"use client";

import { auth } from "@/app/firebase";
import { Button } from "@/components/ui/button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";

const RegisterPage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string>();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    setError(undefined);

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    const passwordRepeat = formData.get("passwordRepeat");
    const email = formData.get("email");

    if (email && password === passwordRepeat)
      createUserWithEmailAndPassword(auth, email as string, password as string)
        .then((authUser) => {
          console.log("Success. The user is created in Firebase");
        })
        .catch((error) => {
          // An error occurred. Set error message to be displayed to user
          setError(error.message);
        });
    else setError("Password do not match");
    event.preventDefault();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="text-gray-100 text-xl text-center">Create an account</div>
      <form ref={formRef} onSubmit={onSubmit} className="grid gap-4">
        <div className="flex flex-col">
          <label className="text-gray-300" htmlFor="register-email">
            Email
          </label>
          <input
            id="register-email"
            type="email"
            placeholder="Email"
            name="email"
          />
        </div>
        <input type="password" placeholder="Password" name="password" />
        <input
          type="password"
          placeholder="Repeat password"
          name="passwordRepeat"
        />
        <Button type="submit">Register</Button>
      </form>
      <Button asChild variant="link">
        <Link href="/login">Already have an account?</Link>
      </Button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default RegisterPage;
