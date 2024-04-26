import { relations } from "drizzle-orm";
import { boolean } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

// Users
export const users = pgTable("users", {
  id: varchar("id", { length: 16 }).primaryKey(),
  username: varchar("username", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  urls: many(urls),
}));

// URLs
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

// IDs
export const ids = pgTable("ids", {
  id: varchar("id", { length: 32 }).primaryKey(),
  taken: boolean("taken").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
