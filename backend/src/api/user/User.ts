import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { users } from "../../../db/schema";
import ID from "../id/id";
import { UserPayload } from "./user.type";
import Exception from "../../core/Exception";

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

  async findOne(payload: { email: string }): Promise<boolean>;
  async findOne(payload: { username: string }): Promise<boolean>;
  async findOne(payload: { id: string }): Promise<boolean>;
  async findOne(
    payload: { email: string } | { username: string } | { id: string }
  ) {
    let user: { id: string }[];

    if ("id" in payload) {
      user = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.id, payload.id));
    } else if ("username" in payload) {
      user = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.username, payload.username));
    } else if ("email" in payload) {
      user = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, payload.email));
    } else {
      throw new Exception(
        "Payload needs to contain 'username', 'email', or 'id'!",
        "Bad Request"
      );
    }

    return user.length ? true : false;
  }
}
