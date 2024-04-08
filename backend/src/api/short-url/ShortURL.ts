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

  constructor() {}

  /**
   * Creates the short url.
   * @param length Defaults to a length of `12`. Can only be `10`, `12`, `14`.
   */
  private generate(length: typeof this.SHORTURL_LENGTH = this.SHORTURL_LENGTH) {
    let url = "";

    for (let i = 0; i < length; i++) {
      let randomCharacter = Math.floor(Math.random() * this.CHARACTERS.length);

      url += this.CHARACTERS[randomCharacter];
    }

    return url;
  }
}
