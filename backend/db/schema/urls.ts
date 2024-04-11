import Config from "../../src/core/Config";
import postgres from "postgres";

import { drizzle } from "drizzle-orm/postgres-js";
import { varchar, pgTable, timestamp } from "drizzle-orm/pg-core";

const DB_URI = new Config().getOne("DB_URI");

export const urls = pgTable("urls", {
  id: varchar("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  original: varchar("original").notNull(),
  short: varchar("short").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const db = drizzle(postgres(DB_URI));
