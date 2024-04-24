import postgres from "postgres";

import { drizzle } from "drizzle-orm/postgres-js";
import { varchar, pgTable, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";
import Config from "../../src/core/Config";

const DB_URI = new Config().getOne("DB_URI");

export const urls = pgTable("urls", {
  id: varchar("id").primaryKey(),
  ownerId: varchar("owner_id", { length: 16 }).references(() => users.id),
  name: varchar("name", { length: 256 }).notNull(),
  url: varchar("url").notNull(),
  short: varchar("short").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const urlsRelations = relations(urls, ({ one }) => ({
  owner: one(users, {
    fields: [urls.ownerId],
    references: [users.id],
  }),
}));

export const db = drizzle(postgres(DB_URI));
