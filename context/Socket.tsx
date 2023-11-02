"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

type SocketContextType = {
  socket: any | null;
  isConnnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState(null);
  const [isConnnected, setIsConnnected] = useState(false);

  useEffect(() => {
    const socketInstance = new (io as any)(process.env.NEXT_PUBLIC_SITE_URL, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });

    socketInstance.on("connect", () => {
      setIsConnnected(true);
    });
    socketInstance.on("disconnect", () => {
      setIsConnnected(false);
    });
    setSocket(socketInstance);

    return () => socketInstance.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnnected }}>
      {children}
    </SocketContext.Provider>
  );
};
