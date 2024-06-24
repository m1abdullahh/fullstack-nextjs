import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `fullstack-nextjs_${name}`);

export const sentences = createTable(
  "sentence",
  {
    id: serial("id").primaryKey(),
    content: varchar("content", { length: 512 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (example) => ({
    contentIndex: index("content_idx").on(example.content),
  }),
);

export const users = createTable(
  "user",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 256 }),
    firstName: varchar("firstName", { length: 256 }).notNull(),
    lastName: varchar("lastName", { length: 256 }).notNull(),
    password: varchar("passwordHash", { length: 256 }).notNull(),
    phoneNo: varchar("phone", { length: 20 }),
  },
  (example) => ({
    emailIndex: index("email_idx").on(example.email),
  }),
);
