import { db } from "../../../db/schema/urls";
import { users } from "../../../db/schema/users";
import ID from "../id/id";
import { UserPayload } from "./user.type";

export default class User {
  constructor(private readonly id: ID = new ID()) {}

  async insertOne(payload: UserPayload) {
    return await db
      .insert(users)
      .values({ ...payload, id: await this.id.insertOne() })
      .returning({
        id: users.id,
        username: users.username,
        email: users.email,
      });
  }
}
