import z from "zod";
import { db, urls } from "../../../db/schema/urls";
import { eq } from "drizzle-orm";
import ID from "../id/id";
import { ids } from "../../../db/schema/ids";

export const ShortURLSchema = z.object({
  id: z.string().min(1),
  ownerId: z.string().min(1),
  name: z.string().min(1),
  original: z.string().url(),
  short: z.string().url(),
});

export default class ShortURL {
  private SHORTURL_LENGTH: 10 | 12 | 14 = 12;

  constructor(private readonly idManager: ID) {}

  getLength() {
    return this.SHORTURL_LENGTH;
  }

  setLength(length: typeof this.SHORTURL_LENGTH) {
    this.SHORTURL_LENGTH = length;
    return this.SHORTURL_LENGTH;
  }

  async insertOne({
    name,
    original,
    short,
    ownerId,
  }: {
    name: string;
    original: string;
    short: string;
    ownerId: string;
  }) {
    return db
      .insert(urls)
      .values({
        name,
        original,
        short,
        id: short,
        ownerId,
      })
      .returning();
  }

  async getOne(id: string) {
    return db.select().from(urls).where(eq(urls.id, id));
  }

  async deleteOne(id: string) {
    await db
      .update(ids)
      .set({ taken: false, updatedAt: new Date(new Date().toLocaleString()) })
      .where(eq(ids.id, id));
    return await db.delete(urls).where(eq(urls.id, id));
  }
}
