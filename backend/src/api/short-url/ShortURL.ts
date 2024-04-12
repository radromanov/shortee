import z from "zod";
import { db, urls } from "../../../db/schema/urls";
import { eq } from "drizzle-orm";
import ID from "../id/id";
import { ids } from "../../../db/schema/ids";
import Config from "../../core/Config";

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
    private readonly config: Config,
    private readonly idManager: ID
  ) {}

  async insertOne(payload: URLPayload) {
    // TODO Format the original URL

    const parsedPayload = URLPayloadSchema.safeParse(payload);

    if (!parsedPayload.success) {
      console.log(parsedPayload.error.message);
      throw new Error(parsedPayload.error.message);
    }

    const { PORT, NODE_ENV, DOMAIN } = this.config.get();
    const { name, original, ownerId } = parsedPayload.data;

    const short = await this.idManager.insertOne();
    const shortUrl =
      NODE_ENV === "development"
        ? `http://localhost:${PORT}/${short}`
        : `https://${DOMAIN}/${short}`;

    return db
      .insert(urls)
      .values({
        name,
        original,
        short: shortUrl,
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
