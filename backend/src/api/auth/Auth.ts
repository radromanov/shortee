import { comparePass } from "../../utils";
import Exception from "../../core/Exception";
import { Request } from "express";
import Cache from "../../core/Cache";
import { UserSession } from "../user/user.type";

export default class Auth {
  constructor(private readonly cache: Cache = new Cache()) {}

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

  async isAuthed(sid: string) {
    let authed = false;

    await this.cache.get().get(sid, (err, data) => {
      if (err) throw err;

      if (data) authed = true;
      else authed = false;
    });

    return authed;
  }

  login(req: Request, payload: UserSession) {
    // @ts-ignore
    req.session.user = payload;

    return this.cache.get().createSession(req, req.session);
  }

  async logout(sid: string) {
    return await this.cache.get().destroy(sid);
  }
}
