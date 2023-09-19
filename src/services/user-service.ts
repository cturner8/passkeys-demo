import { prisma } from "@/libs/prisma";
import type { User, UserCredential } from "@prisma/client";

export const createUser = async (email: string): Promise<User> => {
  return prisma.user.create({
    data: {
      email,
    },
  });
};

export const getUser = async (id: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) throw new Error("User not found");
  return Promise.resolve(user);
};

export const getUserCredentials = async (
  id: string
): Promise<UserCredential[]> => {
  return prisma.userCredential.findMany({
    where: {
      userId: id,
    },
  });
};
