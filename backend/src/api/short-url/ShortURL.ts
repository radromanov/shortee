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

  constructor() {
    const test = this.generate();
  }

  getLength() {
    return this.SHORTURL_LENGTH;
  }

  setLength(length: typeof this.SHORTURL_LENGTH) {
    this.SHORTURL_LENGTH = length;
    return this.SHORTURL_LENGTH;
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
