import Auth from "../api/auth/Auth";

export async function validateAndSetToken(
  incomingPassword: string,
  user: { id: string; email: string; username: string; password: string }
) {
  const auth = new Auth();
  const success = await auth.compare(incomingPassword, user.password);

  if (success) {
    // const token = auth.sign({
    //   id: user.id,
    //   username: user.username,
    //   email: user.email,
    // });
    return { success, id: user.id };
  }

  return { success, id: null };
}
