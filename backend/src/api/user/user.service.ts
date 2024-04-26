import bcrypt from "bcrypt";
import User from "./User";
import { UserInfoPayload } from "./user.type";
import Exception from "../../core/Exception";

export default class UserService {
  constructor(private readonly manager: User = new User()) {}

  async insertOne(payload: UserInfoPayload) {
    // Check if user exists
    if (
      (await this.manager.findOne({ email: payload.email })) ||
      (await this.manager.findOne({ username: payload.username }))
    ) {
      throw new Exception(
        "User with this username or email already exists.",
        "Conflict"
      );
    }

    const user = {
      username: payload.username,
      password: await bcrypt.hash(payload.password, 12),
      email: payload.email,
    };

    return await this.manager.insertOne(user);
  }
}
