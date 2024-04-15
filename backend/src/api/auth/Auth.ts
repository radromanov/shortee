import Config from "../../core/Config";
import bcrypt from "bcrypt";
import Exception from "../../core/Exception";
import Crypto from "crypto-js";

export default class Auth {
  constructor(private readonly config: Config = new Config()) {}

  async compare(plainPass: string, hash: string) {
    let success = false;
    const match = await bcrypt.compare(plainPass, hash);

    if (!match) {
      throw new Exception(
        "Incorrect email or password. Please, try again.",
        "Unauthorized"
      );
    }

    // TODO Send email with magic link
    const token = this.generateToken();
    success = true;

    return { success, token };
  }

  private generateToken(length: 12 | 16 = 12) {
    const characters = this.config.getOne("TOKEN_CHARS");
    let token = "";
    let lastCharacter = "";

    for (let i = 0; i < length; i++) {
      let randomCharacter =
        characters[Math.floor(Math.random() * characters.length)];

      while (lastCharacter === randomCharacter) {
        randomCharacter =
          characters[Math.floor(Math.random() * characters.length)];
      }

      lastCharacter = randomCharacter!;
      token += randomCharacter;
    }

    return this.encode(token);
  }

  sign(payload: any) {
    const header = this.encode(
      JSON.stringify({
        alg: "HmacSHA256",
        typ: "RWT",
      })
    );

    if (typeof payload !== "string") {
      payload = this.encode(JSON.stringify(payload));
    }

    const signature = this.encode(
      JSON.stringify(
        Crypto.HmacSHA256(header + "." + payload, this.config.getOne("RWT_KEY"))
      )
    );

    return `${header}.${payload}.${signature}`;
  }
  private encode(str: string) {
    return Buffer.from(str, "utf8").toString("base64");
  }
  private decode(str: string) {
    return Buffer.from(str, "base64").toString("utf8");
  }
}
