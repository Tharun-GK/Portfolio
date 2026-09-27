/**
 * Database client boundary.
 * Version 1 does not open a database connection.
 * Replace this module with Prisma when PostgreSQL is introduced.
 */
export const db = {
  enabled: false as const,
};

export function isDatabaseEnabled(): boolean {
  return Boolean(process.env.DATABASE_URL) && db.enabled;
}
