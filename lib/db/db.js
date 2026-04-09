import { PrismaClient } from "./generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const globalPrisma = globalThis

function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  })
  return new PrismaClient({ adapter })
}

/** @type {PrismaClient} */ 
const prisma = globalPrisma.__prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalPrisma.__prisma = prisma
}

export default prisma