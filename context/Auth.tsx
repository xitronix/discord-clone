"use client";

import { setJwt } from "@/actions/cookies";
import { auth } from "@/firebase/firebaseClient";
import { User, onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<{ user: User | null }>({ user: null });

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname() || "";

  const isAuthPath = ["/login", "/register"].includes(pathname);

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) {
        await setJwt("");
        setUser(null);
        if (!isAuthPath) {
          router.push("/login");
        }
      } else {
        const jwt = await user.getIdToken();
        await setJwt(jwt);
        setUser(user);
        if (isAuthPath) {
          router.push("/");
        }
      }
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthPath]);

  useEffect(() => {
    const handle = setInterval(async () => {
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
