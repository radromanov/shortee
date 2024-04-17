import Config from "../../core/Config";
import { comparePass } from "../../utils";
import Exception from "../../core/Exception";
import Redis from "ioredis";
import RedisStore from "connect-redis";
import { SessionOptions } from "express-session";
import { Request } from "express";

export default class Auth {
  private store: RedisStore;

  constructor(private readonly config: Config = new Config()) {
    const { REDIS_HOST, REDIS_PASS, REDIS_PORT, REDIS_USER } =
      this.config.get();

    this.store = new RedisStore({
      client: new Redis({
        port: REDIS_PORT, // Redis port
        host: REDIS_HOST, // Redis host
        password: `${REDIS_USER}:${REDIS_PASS}`,
        db: 0, // Defaults to 0
      }),
      prefix: "sid ",
      ttl: 10,
    });
  }

  async compare(plainPass: string, hash: string) {
    const success = await comparePass(plainPass, hash);
    if (!success) {
      throw new Exception(
        "Incorrect email or password. Please, try again.",
        "Unauthorized"
      );
    }

    // TODO Send email with magic link

    return success;
  }

  session(): SessionOptions {
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

  authorize(req: Request) {
    return this.store.createSession(req, req.session);
  }

  async isAuthed(sid: string) {
    let authed = false;

    await this.store.get(sid, (err, data) => {
      if (err) throw err;

      console.log(data);

      if (data) authed = true;
      else authed = false;
    });

    return authed;
  }

  async logout(sid: string) {
    return await this.store.destroy(sid);
  }
}
