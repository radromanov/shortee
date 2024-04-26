import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import Config from "../src/core/Config";
import * as schema from "./schema";

const DB_URI = new Config().getOne("DB_URI");
const sql = postgres(DB_URI, { max: 1 });

export const db = drizzle(sql, { schema });
