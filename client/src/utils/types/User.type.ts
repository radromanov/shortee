import z from "zod";

const USERNAME_MIN_LEN = 3;
const USERNAME_MAX_LEN = 32;
const PASSWORD_MIN_LEN = 8;
const PASSWORD_MAX_LEN = 32;

export const EmailSchema = z
  .string({
    required_error: "Email field is required.",
  })
  .email({ message: "Please enter a valid email." });
export const UsernameSchema = z
  .string({
    required_error: "Username field is required.",
  })
  .min(
    USERNAME_MIN_LEN,
    `Please enter a username between ${USERNAME_MIN_LEN} and ${USERNAME_MAX_LEN} characters.`
  )
  .max(
    USERNAME_MAX_LEN,
    `Please enter a username between ${USERNAME_MIN_LEN} and ${USERNAME_MAX_LEN} characters.`
  );
export const PasswordSchema = z
  .string({
    required_error: "Password field is required.",
  })
  .min(
    PASSWORD_MIN_LEN,
    `Please enter a password between ${PASSWORD_MIN_LEN} and ${PASSWORD_MAX_LEN} characters.`
  )
  .max(
    PASSWORD_MAX_LEN,
    `Please enter a password between ${PASSWORD_MIN_LEN} and ${PASSWORD_MAX_LEN} characters.`
  );
export const ConfirmSchema = z
  .string({
    required_error: "Confirm Password field is required.",
  })
  .min(
    PASSWORD_MIN_LEN,
    `Please enter a password between ${PASSWORD_MIN_LEN} and ${PASSWORD_MAX_LEN} characters.`
  )
  .max(
    PASSWORD_MAX_LEN,
    `Please enter a password between ${PASSWORD_MIN_LEN} and ${PASSWORD_MAX_LEN} characters.`
  );

export const UserInfoSchema = z.object({
  username: UsernameSchema,
  email: EmailSchema,
  password: PasswordSchema,
  confirm: ConfirmSchema,
});
export const UserPayload = z.object({
  username: UsernameSchema,
  email: EmailSchema,
  password: PasswordSchema,
});
export const UserLoginSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});
export const UserSessionSchema = z.object({
  id: z.string(),
  username: UsernameSchema,
  email: EmailSchema,
});

export type UserInfoPayload = z.infer<typeof UserInfoSchema>;
export type UserPayload = z.infer<typeof UserPayload>;
export type UserLoginPayload = z.infer<typeof UserLoginSchema>;
export type UserSession = z.infer<typeof UserSessionSchema>;
