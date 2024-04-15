import bcrypt from "bcrypt";

export async function comparePass(plainPass: string, hash: string) {
  const match = await bcrypt.compare(plainPass, hash);

  if (!match) {
    return false;
  }

  return true;
}
