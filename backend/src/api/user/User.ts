import { db } from "../../../db/schema/urls";
import { users } from "../../../db/schema/users";
import { UserPayload } from "./user.type";

export default class User {
  constructor() {}

  async insertOne(payload: UserPayload) {
    return await db.insert(users).values(payload).returning({
      id: users.id,
      username: users.username,
      email: users.email,
    });
  }
}
