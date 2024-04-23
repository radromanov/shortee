import React from "react";
import { Exception } from "../types/Error.type";
import { z } from "zod";

let fetchOpts: RequestInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  mode: "cors",
  credentials: "include",
};

export function handleFetch<Payload, Result>({
  url,
  method = "GET",
  payload,
  setData,
  schema,
}: {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  payload?: Payload;
  schema: z.ZodSchema<Result>;
  setData: React.Dispatch<
    React.SetStateAction<{
      content: Result | null;
      error: Exception | null;
      status: "idle" | "loading" | "success" | "fail";
    }>
  >;
}) {
  if (method !== "GET") {
    fetchOpts = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify(payload),
    };
  }

  return fetch(url, fetchOpts)
    .then((response) => response.json())
    .then((data) => {
      if ("exception" in data) {
        return setData((prev) => ({
          ...prev,
          content: null,
          error: data,
          status: "fail",
        }));
      }

      const content = schema.safeParse(data);
      if (!content.success) {
        return setData((prev) => ({
          ...prev,
          content: null,
          error: {
            exception: "Internal Server Error",
            message: "Malformed response sent from server.",
            stack: null,
            status: 500,
          },
          status: "fail",
        }));
      }

      return setData((prev) => ({
        ...prev,
        content: content.data,
        error: null,
        status: "success",
      }));
    });
}
