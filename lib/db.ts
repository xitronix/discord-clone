import { PrismaClient } from "@prisma/client";
import { User } from "firebase/auth";
import { firebaseAdmin } from "@/app/firebase/firebaseAdmin";
import { cookies } from "next/headers";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
