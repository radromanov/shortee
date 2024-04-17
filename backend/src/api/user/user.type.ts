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
export const UserPayload = z.object({
  username,
  email,
  password,
});
export const UserLoginSchema = z.object({
  email,
  password,
});
export const UserSessionSchema = z.object({
  id: z.string(),
  username,
  email,
});

export type UserInfoPayload = z.infer<typeof UserInfoSchema>;
export type UserPayload = z.infer<typeof UserPayload>;
export type UserLoginPayload = z.infer<typeof UserLoginSchema>;
export type UserSession = z.infer<typeof UserSessionSchema>;
