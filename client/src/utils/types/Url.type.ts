import { z } from "zod";

export const ShortURLSchema = z.object({
  id: z.string().min(1),
  ownerId: z.string().min(1),
  name: z.string().min(1),
  url: z.string().url(),
  short: z.string().url(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ShortURL = z.infer<typeof ShortURLSchema>;
