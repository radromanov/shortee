import z from "zod";

export const ShortURLSchema = z.object({
  original: z.string().url(),
  short: z.string().url(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export default class ShortURL {
  private SHORTURL_LENGTH: 10 | 12 | 14 = 12;
  private CHARACTERS =
    "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789-_~";

  private id: string;
  private name: string;
  private original: string;
  private short: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(originalUrl: string, name: string) {
    this.id = this.generate();
    this.name = name;
    this.original = originalUrl;
    this.short = `${
      process.env.NODE_ENV === "development"
        ? `http://localhost:${process.env.PORT}`
        : "https://shortee.com"
    }/${this.generate()}`;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  getLength() {
    return this.SHORTURL_LENGTH;
  }

  setLength(length: typeof this.SHORTURL_LENGTH) {
    this.SHORTURL_LENGTH = length;
    return this.SHORTURL_LENGTH;
  }

  get() {
    return {
      id: this.id,
      name: this.name,
      original: this.original,
      short: this.short,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
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
  getCreatedAt() {
    return this.createdAt;
  }
  getUpdatedAt() {
    return this.updatedAt;
  }

  setName(newName: string) {
    this.name = newName;
    this.updatedAt = new Date();

    /**
     *  @todo DB call
     */

    return this.get();
  }
  setOriginal(newOriginal: string) {
    this.original = newOriginal;
    this.updatedAt = new Date();

    /**
     *  @todo DB call
     */

    return this.get();
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
