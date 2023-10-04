"use client";

import { auth } from "@/firebase/firebaseClient";
import { User, onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import nookies from "nookies";
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
        setUser(null);
        nookies.set(undefined, "jwt", "");
        if (!isAuthPath) {
          router.push("/login");
        }
      } else {
        const jwt = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, "jwt", jwt);
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

  // const isUser = nookies.get(undefined, 'jwt')
  // if (isAuthPath && user) {
  //   router.push("/");
  // } else if (!isAuthPath && !user)
  // console.log({ user, isAuthPath });

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
