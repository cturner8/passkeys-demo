import { PrismaClient, type Prisma } from "@prisma/client";

const options: Prisma.PrismaClientOptions = {};
export const prisma = new PrismaClient(options);
