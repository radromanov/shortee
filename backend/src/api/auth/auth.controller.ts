import { Request, Response } from "express";
import { UserLoginSchema } from "../user/user.type";
import Exception from "../../core/Exception";
import { db } from "../../../db/schema/urls";
import { users } from "../../../db/schema/users";
import { eq } from "drizzle-orm";
import AuthService from "./auth.service";
import Auth from "./Auth";

export default class AuthController {
  constructor(
    private readonly service: AuthService = new AuthService(),
    private readonly auth: Auth = new Auth()
  ) {}

  async handleSession(req: Request, res: Response) {
    // @ts-ignore
    if (!req.authed) {
      throw new Exception(
        "You need to log in to view the page's contents.",
        "Unauthorized"
      );
    }

    // @ts-ignore
    return res.status(200).send(req.session.user);
  }

  async handleLogout(req: Request, res: Response) {
    this.auth.logout(req.sessionID);
    //@ts-ignore
    req.authed = false;

    return res
      .status(200)
      .clearCookie("connect.sid")
      .send({ message: "Successfully logged out." });
  }

  async handleLogin(req: Request, res: Response) {
    // Ensure payload integrity
    const payload = UserLoginSchema.safeParse(req.body);
    if (!payload.success) {
      throw new Exception(
        "Incorrect email or password. Please, try again.",
        "Unauthorized"
      );
    }

    const { email, password } = payload.data;

    // Compare passwords
    const { success, hash } = await this.service.fetchPass({ email });
    if (!success || !hash) {
      throw new Exception(
        "Incorrect email or password. Please, try again.",
        "Unauthorized"
      );
    }

    if (!(await this.service.comparePass(password, hash))) {
      throw new Exception(
        "Incorrect email or password. Please, try again.",
        "Unauthorized"
      );
    }

    // Fetch user
    const user = await db
      .select({
        id: users.id,
        email: users.email,
        username: users.username,
      })
      .from(users)
      .where(eq(users.email, email));

    if (!user.length) {
      throw new Exception(
        "Incorrect email or password. Please, try again.",
        "Unauthorized"
      );
    }

    this.auth.login(req, {
      id: user[0]!.id,
      username: user[0]!.username,
      email: user[0]!.email,
    });

    res.status(200).send({
      id: user[0]!.id,
      username: user[0]!.username,
      email: user[0]!.email,
    });
  }
}
