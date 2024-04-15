import { eq } from "drizzle-orm";
import { db } from "../../db/schema/urls";
import { users } from "../../db/schema/users";
import Exception from "../core/Exception";

export async function fetchPass(payload: { email: string }): Promise<{
  id: string;
  email: string;
  username: string;
  password: string;
}>;
export async function fetchPass(payload: { username: string }): Promise<{
  id: string;
  email: string;
  username: string;
  password: string;
}>;
export async function fetchPass(
  payload: { email: string } | { username: string }
) {
  let user: { id: string; password: string }[] = [];

  if ("email" in payload) {
    user = await db
      .select({
        password: users.password,
        id: users.id,
        username: users.username,
        email: users.email,
      })
      .from(users)
      .where(eq(users.email, payload.email));
  } else if ("username" in payload) {
    user = await db
      .select({
        password: users.password,
        id: users.id,
        username: users.username,
        email: users.email,
      })
      .from(users)
      .where(eq(users.username, payload.username));
  }

  if (!user.length) {
    throw new Exception(
      "Something went wrong. Please, try again.",
      "Internal Server Error"
    );
  }

  return user[0];
}
