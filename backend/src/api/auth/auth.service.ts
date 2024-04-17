import { compare } from "bcrypt";
import { eq } from "drizzle-orm";
import { db } from "../../../db/schema/urls";
import { users } from "../../../db/schema/users";
import Exception from "../../core/Exception";

export default class AuthService {
  constructor() {}

  async fetchPass(payload: { email: string }): Promise<string>;
  async fetchPass(payload: { username: string }): Promise<string>;
  async fetchPass(payload: { email: string } | { username: string }) {
    let data: { password: string }[] = [];

    if ("email" in payload) {
      data = await db
        .select({
          password: users.password,
        })
        .from(users)
        .where(eq(users.email, payload.email));
    } else if ("username" in payload) {
      data = await db
        .select({
          password: users.password,
        })
        .from(users)
        .where(eq(users.username, payload.username));
    }

    if (!data.length || "password"! in data) {
      throw new Exception(
        "Something went wrong. Please, try again.",
        "Internal Server Error"
      );
    }

    return data[0]!.password;
  }

  async comparePass(plainPass: string, hash: string) {
    return await compare(plainPass, hash);
  }
}
