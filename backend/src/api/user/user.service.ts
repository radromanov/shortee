import User from "./User";
import { UserInfoPayload } from "./user.type";

export default class UserService {
  constructor(private readonly manager: User = new User()) {}

  async insertOne(payload: UserInfoPayload) {
    return await this.manager.insertOne(payload);
  }
}
