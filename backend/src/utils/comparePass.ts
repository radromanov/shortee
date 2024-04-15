import bcrypt from "bcrypt";
import Exception from "../core/Exception";

export default async function comparePass(plainPass: string, hash: string) {
  const match = await bcrypt.compare(plainPass, hash);

  if (!match) {
    throw new Exception(
      "Incorrect email or password. Please, try again.",
      "Unauthorized"
    );
  }

  // TODO Send email with magic link

  return true;
}
