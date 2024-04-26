import { compare } from "bcrypt";
import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { users } from "../../../db/schema";

export default class AuthService {
  constructor() {}

  async fetchPass(payload: {
    email: string;
  }): Promise<{ success: boolean; hash: string | null }>;
  async fetchPass(payload: {
    username: string;
  }): Promise<{ success: boolean; hash: string | null }>;
  async fetchPass(
    payload: { email: string } | { username: string }
  ): Promise<{ success: boolean; hash: string | null }> {
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

    console.log(data);

    if (!data.length || "password"! in data) {
      return { success: false, hash: null };
    }

    return { success: true, hash: data[0]!.password };
  }

  async comparePass(plainPass: string, hash: string) {
    return await compare(plainPass, hash);
  }
}
