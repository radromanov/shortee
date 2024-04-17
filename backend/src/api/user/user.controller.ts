import { Request, Response } from "express";
import UserService from "./user.service";
import { UserInfoSchema } from "./user.type";
import Exception from "../../core/Exception";
import Auth from "../auth/Auth";

export default class UserController {
  constructor(
    private readonly service: UserService = new UserService(),
    private readonly auth: Auth = new Auth()
  ) {}

  async handleGet(req: Request, res: Response) {
    // const { id } = req.params;

    console.log(
      (await this.auth.isAuthed(req.sessionID)) ? "authed" : "not authed"
    );

    res.sendStatus(200);
  }

  async handleSignUp(req: Request, res: Response) {
    const payload = UserInfoSchema.safeParse(req.body);
    if (!payload.success) {
      throw new Exception(
        payload.error.errors[0]?.message || "Invalid user payload.",
        "Unprocessable Content"
      );
    }

    const user = await this.service.insertOne(payload.data);

    res.status(201).json(user);
  }

  async handleLogin(req: Request, res: Response) {
    const payload = req.body;
    const authorized = await this.service.authorize(payload);

    if (!authorized.success || !authorized.user.id) {
      return res.status(401).send({ user: null });
    }

    // req.sessionStore.set(req.sessionID, req.session);
    //@ts-ignore
    req.session.user = {
      id: authorized.user.id,
      email: authorized.user.email,
      username: authorized.user.username,
    };

    this.auth.authorize(req);

    //@ts-ignore
    return res.status(200).send({ user: req.session.user });
  }

  async handleLogout(req: Request, res: Response) {
    if (await this.auth.isAuthed(req.sessionID)) {
      await this.auth.logout(req.sessionID);
    }

    return res.clearCookie("connect.sid").status(200).send({ user: null });
  }
}
