import Crypto from "crypto-js";
import Config from "../../core/Config";
import { comparePass } from "../../utils";
import Exception from "../../core/Exception";

export default class Auth {
  constructor(private readonly config: Config = new Config()) {}

  async compare(plainPass: string, hash: string) {
    const success = await comparePass(plainPass, hash);
    if (!success) {
      throw new Exception(
        "Incorrect email or password. Please, try again.",
        "Unauthorized"
      );
    }

    // TODO Send email with magic link

    return success;
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

  verify(payload: string) {
    return this.decode(payload);
  }

  private encode(str: string) {
    return Buffer.from(str, "utf8").toString("base64");
  }
  private decode(str: string) {
    return Buffer.from(str, "base64").toString("utf8");
  }
}
