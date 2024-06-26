import { useEffect, useState } from "react";
import { Exception } from "../types/Error.type";
import { z } from "zod";
import { UserInfoPayload, UserLoginPayload } from "../types/User.type";

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
type Status = "idle" | "loading" | "success" | "fail";
/**
 * @typedef R Result returned by the API call.
 */
export interface State<R> {
  content: R | null;
  error: Exception | null;
  status: Status;
}

const defaultFetchOpts: RequestInit = {
  method: "GET",
  credentials: "include",
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
  },
};

export const useFetch = <C>() => {
  const [data, setData] = useState<State<C>>({
    content: null,
    error: null,
    status: "idle",
  });

  useEffect(() => {
    const timer = setTimeout(
      () =>
        setData((prev) => ({
          ...prev,
          status: "idle",
        })),
      3000
    );

    return () => clearTimeout(timer);
  }, [data.error, data.content]);

  const fetchData = async <T>({
    url,
    payload,
    schema,
    method = "GET",
  }: {
    url: string;
    payload?: T;
    schema?: z.ZodSchema<C>;
    method: HTTPMethod;
  }) => {
    const fetchOpts = {
      ...defaultFetchOpts,
      method,
      body: payload ? JSON.stringify(payload) : undefined,
    };

    setData((prev) => ({
      ...prev,
      content: null,
      error: null,
      status: "loading",
    }));

    try {
      const response = await fetch(url, fetchOpts);
      const responseData = await response.json();

      if ("exception" in responseData) {
        throw responseData;
      }

      if (schema) {
        const content = schema.safeParse(responseData);

        if (!content.success) {
          throw {
            exception: "Internal Server Error",
            message: "Malformed response sent from server.",
            stack: null,
            status: 500,
          };
        }

        setData({
          content: content.data,
          error: null,
          status: "success",
        });
      } else {
        setData({
          content: responseData,
          error: null,
          status: "success",
        });
      }
    } catch (e) {
      const error = e as {
        exception: string;
        message: string;
        stack: string | null;
        status: number;
      };

      setData({
        content: null,
        status: "fail",
        error,
      });
    }
  };

  const fetchLogin = (payload: UserLoginPayload, schema: z.ZodSchema<C>) =>
    fetchData({
      url: "http://localhost:3001/api/v1/auth/login",
      payload,
      schema,
      method: "POST",
    });

  const fetchSignup = (payload: UserInfoPayload, schema: z.ZodSchema<C>) =>
    fetchData({
      url: "http://localhost:3001/api/v1/user/sign-up",
      payload,
      schema,
      method: "POST",
    });

  const fetchLogout = () =>
    fetchGet("http://localhost:3001/api/v1/auth/logout");

  const fetchSession = () =>
    fetchGet("http://localhost:3001/api/v1/auth", "GET");

  const fetchGet = (url: string, method: HTTPMethod = "GET") =>
    fetchData({ url, method });

  const fetchPut = (
    url: string,
    payload: { id: string; name: string; url: string },
    schema: z.ZodSchema<C>,
    method: HTTPMethod = "PUT"
  ) => fetchData({ url, method, payload, schema });

  const fetchDelete = (
    url: string,
    payload: { id: string },
    method: HTTPMethod = "DELETE"
  ) => fetchData({ url, method, payload });

  return {
    fetchLogin,
    fetchLogout,
    fetchSignup,
    fetchSession,
    fetchGet,
    fetchPut,
    fetchDelete,
    data,
  };
};
