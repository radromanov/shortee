import ID from "../id/id";
import z from "zod";
import Exception from "../../core/Exception";
import { db } from "../../../db/schema/urls";
import { users } from "../../../db/schema/users";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

const UserInfoSchema = z.object({
  username: z.string().min(3).max(32),
  email: z.string().email(),
  password: z.string().min(8).max(32),
  confirmPassword: z.string(),
});

type UserInfoPayload = z.infer<typeof UserInfoSchema>;

export default class User {
  constructor(private readonly idManager: ID) {}

  async insertOne(payload: UserInfoPayload) {
    const parsedPayload = UserInfoSchema.safeParse(payload);
    if (!parsedPayload.success) {
      throw new Exception(parsedPayload.error.message, "Unprocessable Content");
    }

    // Check if user exists
    if (
      (await this.isExist({ email: parsedPayload.data.email })) ||
      (await this.isExist({ username: parsedPayload.data.username }))
    ) {
      throw new Exception(
        "User with this username or email already exists.",
        "Conflict"
      );
    }

    const user = {
      id: await this.idManager.insertOne(),
      username: parsedPayload.data.username,
      password: await bcrypt.hash(parsedPayload.data.password, 12),
      email: parsedPayload.data.email,
    };

    return await db.insert(users).values(user).returning({
      id: users.id,
      username: users.username,
      email: users.email,
    });
  }

  private async isExist(payload: { email: string }): Promise<boolean>;
  private async isExist(payload: { username: string }): Promise<boolean>;
  private async isExist(payload: { email: string } | { username: string }) {
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
