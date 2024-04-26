import { z } from "zod";

export const URLSchema = z
  .string()
  .regex(
    /^(?:https?|http?)(?::\/\/)(?:www\.)([a-zA-Z0-9-])+(?:\.[a-zA-Z]{2,})+(?::\d{2,5})?(?:\/[^\s]*)?$/,
    "Please enter a valid URL."
  );
export const NameSchema = z.string();

export const ShortURLSchema = z.object({
  id: z.string().min(1),
  ownerId: z.string().min(1),
  name: NameSchema,
  url: URLSchema,
  short: z.string().url(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ShortURL = z.infer<typeof ShortURLSchema>;
