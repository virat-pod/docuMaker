"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { getUser } from "@/lib/auth/auth-helper";
import prisma from "@/lib/db/db";
import { NextResponse } from "next/server";

export const userCreation = async () => {
  const { userId } = await auth();
  const client = await clerkClient();

  if (!userId) return null;

  const clerkUser = await client.users.getUser(userId);

  const alreadyUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (alreadyUser) return alreadyUser;

  const createUser = await prisma.user.create({
    data: {
      clerkId: userId,
      name: clerkUser.firstName || "",
      email: clerkUser.emailAddresses[0]?.emailAddress || "",
    },
  });

  return createUser;
};

export const DeleteAccount = async () => {
  const { userId } = await auth();
  const client = await clerkClient();
  const user = await getUser();

  if (!user) {
    return { error: "Unauthorized", status: 401 };
  }

  try {
    await prisma.user.delete({ where: { id: user.id } });
    await client.users.deleteUser(userId);
    return { success: true, status: 200 };
  } catch (err) {
    return { error: err.message, status: 500 };
  }
};
