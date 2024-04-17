import RedisStore from "connect-redis";
import Config from "./Config";
import { Redis } from "ioredis";

export default class Cache {
  private store: RedisStore;

  constructor(private readonly config: Config = new Config()) {
    const {
      REDIS_HOST,
      REDIS_PASS,
      REDIS_PORT,
      REDIS_USER,
      SESSION_PREFIX,
      SESSION_TTL,
    } = this.config.get();

    this.store = new RedisStore({
      client: new Redis({
        port: REDIS_PORT, // Redis port
        host: REDIS_HOST, // Redis host
        password: `${REDIS_USER}:${REDIS_PASS}`,
        db: 0, // Defaults to 0
      }),
      prefix: `${SESSION_PREFIX} `,
      ttl: SESSION_TTL,
    });
  }

  get() {
    return this.store;
  }

  init() {
    const { NODE_ENV, RWT_KEY } = this.config.get();

    return {
      store: this.store,
      secret: RWT_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: false,
        secure: NODE_ENV === "development" ? false : true,
      },
    };
  }
}
