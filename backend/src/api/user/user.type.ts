import z from "zod";

const USERNAME_MIN_LEN = 3;
const USERNAME_MAX_LEN = 32;
const PASSWORD_MIN_LEN = 8;
const PASSWORD_MAX_LEN = 32;

const username = z
  .string({
    required_error: `Please enter a username between ${USERNAME_MIN_LEN} and ${USERNAME_MAX_LEN} characters..`,
  })
  .min(USERNAME_MIN_LEN)
  .max(USERNAME_MAX_LEN);
const password = z
  .string({
    required_error: `Please enter a password between ${PASSWORD_MIN_LEN} and ${PASSWORD_MAX_LEN} characters.`,
  })
  .min(PASSWORD_MIN_LEN)
  .max(PASSWORD_MAX_LEN);
const email = z
  .string({
    required_error: "Please enter a valid email.",
  })
  .email();

export const UserInfoSchema = z.object({
  username,
  email,
  password,
  confirmPassword: z.string(),
});

export type UserInfoPayload = z.infer<typeof UserInfoSchema>;
