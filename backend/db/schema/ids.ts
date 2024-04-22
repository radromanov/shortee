import { timestamp, varchar, boolean, pgTable } from "drizzle-orm/pg-core";

export const ids = pgTable("ids", {
  id: varchar("id", { length: 32 }).primaryKey(),
  taken: boolean("taken").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
