import bcrypt from "bcrypt";

import Config from "../../core/Config";
import Exception from "../../core/Exception";
import ID from "../id/id";
import User from "./User";
import { UserInfoPayload } from "./user.type";
import { users } from "../../../db/schema/users";
import { eq } from "drizzle-orm";
import { db } from "../../../db/schema/urls";
import { resolve } from "path";

export default class UserService {
  constructor(
    private readonly manager: User = new User(),
    private readonly id: ID = new ID(new Config())
  ) {}

  async insertOne(payload: UserInfoPayload) {
    // Check if user exists
    if (
      (await this.isExist({ email: payload.email })) ||
      (await this.isExist({ username: payload.username }))
    ) {
      throw new Exception(
        "User with this username or email already exists.",
        "Conflict"
      );
    }

    const user = {
      id: await this.id.insertOne(),
      username: payload.username,
      password: await bcrypt.hash(payload.password, 12),
      email: payload.email,
    };

    return await this.manager.insertOne(user);
  }

  async authorize(payload: any) {
    const notExist = !(await this.isExist({ email: payload.email }));

    if (notExist) {
      throw new Exception(
        "Incorrect email or password. Please, try again.",
        "Unauthorized"
      );
    }

    const [user] = await db
      .select({ password: users.password })
      .from(users)
      .where(eq(users.email, payload.email));

    if (!user?.password) {
      throw new Exception(
        "Something went wrong. Please, try again.",
        "Internal Server Error"
      );
    }

    console.log(user, payload.password);

    const match = await bcrypt.compare(payload.password, user.password);

    if (!match) {
      throw new Exception(
        "Incorrect email or password. Please, try again.",
        "Unauthorized"
      );
    }

    return true;
  }

  async isExist(payload: { email: string }): Promise<boolean>;
  async isExist(payload: { username: string }): Promise<boolean>;
  async isExist(payload: { email: string } | { username: string }) {
    if ("username" in payload) {
      return (
        await db
          .select({ id: users.id })
          .from(users)
          .where(eq(users.username, payload.username))
      ).length
        ? true
        : false;
    } else if ("email" in payload) {
      return (
        await db
          .select({ id: users.id })
          .from(users)
          .where(eq(users.email, payload.email))
      ).length
        ? true
        : false;
    }

    throw new Exception(
      "Payload needs to contain 'username' or 'email' key!",
      "Bad Request"
    );
  }
}
