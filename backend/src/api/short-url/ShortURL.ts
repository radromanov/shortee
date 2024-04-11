import z from "zod";
import Config from "../../core/Config";
import { db, urls } from "../../../db/schema/urls";
import { eq } from "drizzle-orm";

export const ShortURLSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  original: z.string().url(),
  short: z.string().url(),
});

export default class ShortURL {
  private SHORTURL_LENGTH: 10 | 12 | 14 = 12;
  private CHARACTERS =
    "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789-_~";

  private id: string;
  private name: string;
  private original: string;
  private short: string;

  constructor(originalUrl: string, name: string) {
    const envConfig = new Config();
    const { PORT, NODE_ENV, DOMAIN } = envConfig.get();

    this.id = this.generate();
    this.name = name;
    this.original = originalUrl;
    this.short = `${
      NODE_ENV === "development"
        ? `http://localhost:${PORT}`
        : `https://${DOMAIN}`
    }/${this.id}`;
  }

  getLength() {
    return this.SHORTURL_LENGTH;
  }

  setLength(length: typeof this.SHORTURL_LENGTH) {
    this.SHORTURL_LENGTH = length;
    return this.SHORTURL_LENGTH;
  }

  get() {
    return ShortURLSchema.parse({
      id: this.id,
      name: this.name,
      original: this.original,
      short: this.short,
    });
  }
  getID() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getOriginal() {
    return this.original;
  }
  getShort() {
    return this.short;
  }

  setName(newName: string) {
    this.name = newName;

    /**
     *  @todo DB call
     */

    return this.get();
  }
  setOriginal(newOriginal: string) {
    this.original = newOriginal;

    /**
     *  @todo DB call
     */

    return this.get();
  }

  async insertOne() {
    return db
      .insert(urls)
      .values({
        name: this.name,
        original: this.original,
        short: this.short,
        id: this.id,
      })
      .returning();
  }

  async getOne(id: string) {
    return db.select().from(urls).where(eq(urls.id, id));
  }

  /**
   * Creates the short url.
   * @param length Defaults to a length of `12`. Can only be `10`, `12`, `14`.
   */
  private generate(length: typeof this.SHORTURL_LENGTH = this.SHORTURL_LENGTH) {
    let url = "";
    let lastCharacter = "";

    for (let i = 0; i < length; i++) {
      let randomCharacter = this.pickRandomCharacter();

      // Ensure current character is not the same as the last one
      while (randomCharacter === lastCharacter) {
        randomCharacter = this.pickRandomCharacter();
      }

      lastCharacter = randomCharacter;
      url += randomCharacter;
    }

    return url;
  }

  private pickRandomCharacter(characters: string = this.CHARACTERS) {
    let randomCharacterIndex = Math.floor(Math.random() * characters.length);
    let randomCharacter = characters[randomCharacterIndex];

    return randomCharacter!;
  }
}
