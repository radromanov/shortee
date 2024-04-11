import dotenv from "dotenv";
import z from "zod";

const EnvSchema = z.object({
  PORT: z.number(),
  DOMAIN: z.string(),
  NODE_ENV: z.enum(["development", "production", "testing", "staging"]),
  ID_CHARS: z.string(),
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
      POSTGRES_USER: process.env.POSTGRES_USER,
      POSTGRES_PASS: process.env.POSTGRES_PASS,
      POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT || "5432"),
      POSTGRES_DB: process.env.POSTGRES_DB,
      DB_URI: process.env.DB_URI,
    });
  }
}
