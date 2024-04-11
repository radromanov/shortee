import { timestamp, varchar, boolean, pgTable } from "drizzle-orm/pg-core";

export const ids = pgTable("ids", {
  id: varchar("id", { length: 32 }).primaryKey(),
  taken: boolean("taken").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
