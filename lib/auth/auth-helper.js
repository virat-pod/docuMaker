"use server"
import { auth } from "@clerk/nextjs/server"
import prisma from "../db/db";

export const getUser = async()=> {
    const { userId } = await auth();
    if(!userId) return null;
    const user = await prisma.user.findUnique({where: {clerkId: userId}})

    return user;
}