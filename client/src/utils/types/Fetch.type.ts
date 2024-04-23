import { z } from "zod";

interface ParamsWithPayload<T> {
  url: string;
  schema: z.ZodSchema;
  payload: T;
  method: "GET" | "POST" | "PUT" | "DELETE";
}

interface ParamsWithoutPayload {
  url: string;
  schema?: never;
  payload?: never;
  method?: never;
}

export type Signature<T> = ParamsWithPayload<T> | ParamsWithoutPayload;
export type Fetch<T> = {
  status: "loading" | "success" | "fail" | "idle";
  error: {
    message: string;
    exception: string;
    status: number;
    stack: string | null;
  } | null;
  content: T | null;
};
