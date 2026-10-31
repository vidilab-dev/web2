import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

/**
 * Shared Prisma client, wired to Supabase/PostgreSQL when DATABASE_URL is set.
 *
 * Returns null when no DATABASE_URL is configured so every caller can fall
 * back to the typed local content layer. The singleton avoids exhausting the
 * pooler under Next.js hot reload and serverless reuse.
 */

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient(): PrismaClient | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  const pool = new Pool({ connectionString: url });
  const adapter = new PrismaPg(pool);
  const client = new PrismaClient({ adapter });
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
  return client;
}

export function prisma(): PrismaClient | null {
  try {
    return createClient();
  } catch (err) {
    console.error("[db] failed to initialise Prisma client", err);
    return null;
  }
}

/** True when the site is running against PostgreSQL instead of local content. */
export function isDatabaseEnabled(): boolean {
  return Boolean(process.env.DATABASE_URL);
}
