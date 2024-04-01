import { PrismaClient } from "@prisma/client";

const globalFormprisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalFormprisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalFormprisma.prisma;
