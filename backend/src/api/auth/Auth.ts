import { Request } from "express";
import Cache from "../../core/Cache";
import { UserSession } from "../user/user.type";

export default class Auth {
  constructor(private readonly cache: Cache = new Cache()) {}

  login(req: Request, payload: UserSession) {
    // @ts-ignore
    req.session.user = payload;

    return this.cache.get().createSession(req, req.session);
  }

  async logout(sid: string) {
    return await this.cache.get().destroy(sid);
  }
}
