import dotenv from "dotenv";
import z from "zod";

const EnvSchema = z.object({
  PORT: z.number(),
  DOMAIN: z.string(),
  NODE_ENV: z.enum(["development", "production", "testing", "staging"]),
  ID_CHARS: z.string(),
  RWT_KEY: z.string(),
  MORGAN: z.enum(["combined", "common", "dev", "tiny", "short"]),
  REDIS_USER: z.string(),
  REDIS_PASS: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.number(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASS: z.string(),
  POSTGRES_PORT: z.number(),
  POSTGRES_DB: z.string(),
  DB_URI: z.string(),
});

type EnvConfig = z.infer<typeof EnvSchema>;

export default class Config {
  private config: EnvConfig;

  constructor() {
    dotenv.config();

    this.config = this.init();
  }

  get() {
    return this.config;
  }

  getOne<T extends keyof EnvConfig>(key: T) {
    return this.config[key];
  }

  private init() {
    return EnvSchema.parse({
      PORT: parseInt(process.env.PORT || "3001"),
      DOMAIN: process.env.DOMAIN,
      NODE_ENV: process.env.NODE_ENV,
      ID_CHARS: process.env.ID_CHARS,
      RWT_KEY: process.env.RWT_KEY,
      MORGAN: process.env.MORGAN,
      REDIS_USER: process.env.REDIS_USER,
      REDIS_PASS: process.env.REDIS_PASS,
      REDIS_HOST: process.env.REDIS_HOST,
      REDIS_PORT: parseInt(process.env.REDIS_PORT || "6379"),
      POSTGRES_USER: process.env.POSTGRES_USER,
      POSTGRES_PASS: process.env.POSTGRES_PASS,
      POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT || "5432"),
      POSTGRES_DB: process.env.POSTGRES_DB,
      DB_URI: process.env.DB_URI,
    });
  }
}
