import dotenv from "dotenv";
import z from "zod";

const EnvSchema = z.object({
  PORT: z.number(),
  DOMAIN: z.string(),
  NODE_ENV: z.enum(["development", "production", "testing", "staging"]),
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
    });
  }
}
