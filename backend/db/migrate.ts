import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import Config from "../src/core/Config";

const DB_URI = new Config().getOne("DB_URI");

const sql = postgres(DB_URI, { max: 1 });

migrate(drizzle(sql), {
  migrationsFolder: "/home/rads/Projects/shortee/backend/db/migrations",
});

sql.end();
