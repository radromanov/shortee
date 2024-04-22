import z from "zod";
import { db, urls } from "../../../db/schema/urls";
import { eq } from "drizzle-orm";
import ID from "../id/id";
import { ids } from "../../../db/schema/ids";
import Config from "../../core/Config";
import Exception from "../../core/Exception";

export const ShortURLSchema = z.object({
  id: z.string().min(1),
  ownerId: z.string().min(1),
  name: z.string().min(1),
  original: z.string().url(),
  short: z.string().url(),
});

const URLPayloadSchema = z.object({
  name: z.string().min(1),
  original: z.string().min(1),
  ownerId: z.string().min(1),
});
type URLPayload = z.infer<typeof URLPayloadSchema>;

export default class ShortURL {
  constructor(
    private readonly config: Config = new Config(),
    private readonly idManager: ID = new ID()
  ) {}

  async insertOne(payload: URLPayload) {
    // TODO Format the original URL

    const parsedPayload = URLPayloadSchema.safeParse(payload);

    if (!parsedPayload.success) {
      console.log(parsedPayload.error.message);
      throw new Exception(parsedPayload.error.message, "Unprocessable Content");
    }

    const { PORT, NODE_ENV, DOMAIN } = this.config.get();
    const { name, original, ownerId } = parsedPayload.data;

    const id = await this.idManager.insertOne();
    const short =
      NODE_ENV === "development"
        ? `http://localhost:${PORT}/${id}`
        : `https://${DOMAIN}/${id}`;

    const shortUrl = await db
      .insert(urls)
      .values({
        name,
        original,
        short,
        id,
        ownerId,
      })
      .returning();

    return shortUrl;
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

  async isExists(id: string) {
    console.log(
      await db.select({ taken: ids.id }).from(ids).where(eq(ids.id, id))
    );
    return (
      await db.select({ taken: ids.taken }).from(ids).where(eq(ids.id, id))
    ).length
      ? true
      : false;
  }
}
