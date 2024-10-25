import type { Config } from "drizzle-kit"

export default {
  schema: "./src/lib/schema.ts",
  out: "./drizzle/migrations",
  driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} satisfies Config
