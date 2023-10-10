import { NextApiHandler } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = (res, req) => {};

export default handler;
