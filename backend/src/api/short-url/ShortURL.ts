import z from "zod";
import { eq } from "drizzle-orm";
import ID from "../id/id";
import Config from "../../core/Config";
import Exception from "../../core/Exception";
import { ids, urls } from "../../../db/schema";
import { db } from "../../../db";

export const URLSchema = z
  .string()
  .regex(
    /^(?:https?|http?)(?::\/\/)(?:www\.)([a-zA-Z0-9-])+(?:\.[a-zA-Z]{2,})+(?::\d{2,5})?(?:\/[^\s]*)?$/,
    "Please enter a valid URL."
  );
export const NameSchema = z.string();

export const ShortURLSchema = z.object({
  id: z.string().min(1),
  ownerId: z.string().min(1),
  name: NameSchema,
  url: URLSchema,
  short: z.string().url(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const URLPayloadSchema = z.object({
  name: NameSchema,
  url: URLSchema,
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
    const { name, url, ownerId } = parsedPayload.data;

    const id = await this.idManager.insertOne();
    const short =
      NODE_ENV === "development"
        ? `http://localhost:${PORT}/${id}`
        : `https://${DOMAIN}/${id}`;

    const shortUrl = await db
      .insert(urls)
      .values({
        name,
        url,
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
  async getAll(ownerId: string) {
    return await db.select().from(urls).where(eq(urls.ownerId, ownerId));
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
