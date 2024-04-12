import ID from "../id/id";
import z from "zod";
import Exception from "../../core/Exception";
import Config from "../../core/Config";
import { db } from "../../../db/schema/urls";
import { users } from "../../../db/schema/users";

const UserInfoSchema = z.object({
  username: z.string().min(3).max(32),
  email: z.string().email(),
  password: z.string().min(8).max(32),
  confirmPassword: z.string(),
});

type UserInfoPayload = z.infer<typeof UserInfoSchema>;

export default class User {
  constructor(
    private readonly config: Config,
    private readonly idManager: ID
  ) {}

  async insertOne(payload: UserInfoPayload) {
    const parsedPayload = UserInfoSchema.safeParse(payload);
    if (!parsedPayload.success) {
      throw new Exception(parsedPayload.error.message, "Unprocessable Content");
    }

    const user = {
      id: await this.idManager.insertOne(),
      username: parsedPayload.data.username,
      password: parsedPayload.data.password,
      email: parsedPayload.data.email,
    };

    return await db.insert(users).values(user).returning({
      id: users.id,
      username: users.username,
      email: users.email,
    });
  }
}
