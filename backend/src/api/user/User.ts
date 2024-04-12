import { Config } from "drizzle-kit";
import ID from "../id/id";
import z from "zod";
import Exception from "../../core/Exception";

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

    console.log(parsedPayload.data);
    return parsedPayload.data;
  }
}
