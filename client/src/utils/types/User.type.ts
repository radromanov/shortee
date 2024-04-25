import z from "zod";

const USERNAME_MIN_LEN = 3;
const USERNAME_MAX_LEN = 32;
const PASSWORD_MIN_LEN = 8;
const PASSWORD_MAX_LEN = 32;

export const EmailSchema = z
  .string({
    required_error: "Email is required.",
  })
  .email({ message: "Please enter a valid email address." });

export const UsernameSchema = z
  .string({
    required_error: "Username is required.",
  })
  .min(
    USERNAME_MIN_LEN,
    `Username must be between ${USERNAME_MIN_LEN} and ${USERNAME_MAX_LEN} characters.`
  )
  .max(
    USERNAME_MAX_LEN,
    `Username must be between ${USERNAME_MIN_LEN} and ${USERNAME_MAX_LEN} characters.`
  );

export const PasswordSchema = z
  .string({
    required_error: "Password is required.",
  })
  .min(
    PASSWORD_MIN_LEN,
    `Password must be between ${PASSWORD_MIN_LEN} and ${PASSWORD_MAX_LEN} characters.`
  )
  .max(
    PASSWORD_MAX_LEN,
    `Password must be between ${PASSWORD_MIN_LEN} and ${PASSWORD_MAX_LEN} characters.`
  );

export const ConfirmPasswordSchema = z
  .string({
    required_error: "Confirm Password is required.",
  })
  .min(PASSWORD_MIN_LEN, `Passwords must match.`)
  .max(PASSWORD_MAX_LEN, `Passwords must match.`);

export const UserInfoSchema = z
  .object({
    username: UsernameSchema,
    email: EmailSchema,
    password: PasswordSchema,
    confirmPassword: ConfirmPasswordSchema,
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
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
export type UserPayloadType = z.infer<typeof UserPayload>;
export type UserLoginPayload = z.infer<typeof UserLoginSchema>;
export type UserSession = z.infer<typeof UserSessionSchema>;
