import bcrypt from "bcrypt";

import User from "./User";
import { UserInfoPayload, UserLoginSchema } from "./user.type";
import { users } from "../../../db/schema/users";
import { eq } from "drizzle-orm";
import { db } from "../../../db/schema/urls";
import { fetchPass, validateAndSetToken } from "../../utils";
import Exception from "../../core/Exception";

export default class UserService {
  constructor(private readonly manager: User = new User()) {}

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
      username: payload.username,
      password: await bcrypt.hash(payload.password, 12),
      email: payload.email,
    };

    return await this.manager.insertOne(user);
  }

  async authorize(payload: { email: string; password: string }) {
    const UNAUTHORIZED_MESSAGE =
      "Incorrect email or password. Please, try again." as const;

    const parsedPayload = UserLoginSchema.safeParse(payload);
    if (!parsedPayload.success) {
      throw new Exception(UNAUTHORIZED_MESSAGE, "Unauthorized");
    }

    const notExist = !(await this.isExist({ email: payload.email }));

    if (notExist) {
      throw new Exception(UNAUTHORIZED_MESSAGE, "Unauthorized");
    }

    const user = await fetchPass({ email: payload.email });

    return await validateAndSetToken(payload.password, user);
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
