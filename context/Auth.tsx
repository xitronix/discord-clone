"use client";

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
  const pathname = usePathname();

  const isAuthPath = ["/login", "/register"].includes(pathname);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, [user]);

  if (user && isAuthPath) {
    router.push("/");
  } else if (!user && !isAuthPath) {
    router.push("/login");
  }
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
