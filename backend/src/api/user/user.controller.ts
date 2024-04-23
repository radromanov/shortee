import { Request, Response } from "express";
import UserService from "./user.service";
import { UserInfoSchema } from "./user.type";
import Exception from "../../core/Exception";

export default class UserController {
  constructor(private readonly service: UserService = new UserService()) {}

  async handleSignUp(req: Request, res: Response) {
    const payload = UserInfoSchema.safeParse(req.body);
    if (!payload.success) {
      // console.log(payload.error);
      // console.log(payload.error.issues[0]?.path);

      throw new Exception(
        payload.error.errors[0]?.message || "Invalid user payload.",
        "Unprocessable Content"
      );
    }

    const user = await this.service.insertOne(payload.data);

    res.status(201).send(user);
  }
}
