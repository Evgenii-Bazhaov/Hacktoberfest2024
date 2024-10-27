import {
  integer,
  json,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core"

export const test = pgTable(
  "test",
  {
    id: text("id").notNull().primaryKey(),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    image: text("image"),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex("unique_email").on(users.email),
    }
  }
)
