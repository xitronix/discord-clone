import { Server as HttpServer } from "http";
import { Server as NetServer, Socket } from "net";
import { NextApiRequest, NextApiResponse } from "next/types";
import { Server as SocketIOServer } from "socket.io";

type NextApiResonseServerIo = NextApiResponse & {
  socket: Socket & {
    server: HttpServer & {
      io: SocketIOServer;
    };
  };
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResonseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: HttpServer = res.socket.server;
    const io = new SocketIOServer(httpServer, {
      path,
      addTrailingSlash: false,
    });
    res.socket.server.io = io;
  }

  res.end();
};

export default ioHandler;
