import { eq } from "drizzle-orm";
import { ids } from "../../../db/schema/ids";
import Config from "../../core/Config";
import { db } from "../../../db/schema/urls";

const LENGTH: 8 | 12 | 16 = 12;

export default class ID {
  constructor(
    private readonly config: Config,
    private readonly length: typeof LENGTH = LENGTH
  ) {}

  private generate() {
    let id = "";
    let lastCharacter = "";

    for (let i = 0; i < this.length; i++) {
      let randomCharacter = this.pickRandomCharacter();

      // Ensure current character is not the same as the last one
      while (randomCharacter === lastCharacter) {
        randomCharacter = this.pickRandomCharacter();
      }

      lastCharacter = randomCharacter;
      id += randomCharacter;
    }

    return id;
  }

  private pickRandomCharacter(
    characters: string = this.config.getOne("ID_CHARS")
  ) {
    let randomCharacterIndex = Math.floor(Math.random() * characters.length);
    let randomCharacter = characters[randomCharacterIndex];

    return randomCharacter!;
  }

  private async isExists(id: string) {
    const idFound = await db
      .select({ taken: ids.taken })
      .from(ids)
      .where(eq(ids.id, id));

    // If length > 0, return `true` for found; else, return `false` for not found
    return idFound.length ? true : false;
  }

  async insertOne() {
    let id = this.generate();

    if (await this.isExists(id)) {
      id = this.generate();
    }

    await db.insert(ids).values({ id });

    return id;
  }
}
