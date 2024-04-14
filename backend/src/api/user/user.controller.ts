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

    res.json(user);
  }
}
