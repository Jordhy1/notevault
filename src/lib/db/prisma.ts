import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const databaseUrl =
  process.env.NODE_ENV === "development" && !process.env.DATABASE_SSL_CA
    ? process.env.DATABASE_URL?.replace(/([?&])sslmode=require\b/, "$1sslmode=no-verify")
    : process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: process.env.DATABASE_SSL_CA
    ? { ca: process.env.DATABASE_SSL_CA, rejectUnauthorized: true }
    : { rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === "true" },
});

const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
