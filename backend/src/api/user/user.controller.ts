import { Request, Response } from "express";
import UserService from "./user.service";
import { UserInfoSchema } from "./user.type";
import Exception from "../../core/Exception";

export default class UserController {
  constructor(private readonly service: UserService = new UserService()) {}

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

    console.log(payload);

    const authorized = await this.service.authorize(payload);

    if (!authorized.success || !authorized.token) {
      return res
        .status(401)
        .json({ message: "Incorrect email or password. Please, try again..." });
    }

    req.headers.authorization = "Bearer " + authorized.token;

    return res
      .setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
      .status(200)
      .send(req.headers.authorization);
  }
}
