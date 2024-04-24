import { useEffect, useState } from "react";
import {
  UserSession,
  UserLoginPayload,
  UserSessionSchema,
  UserInfoPayload,
} from "../types/User.type";
import { useFetch } from "./useFetch";
import { Exception } from "../types/Error.type";

export default function useProvideAuth() {
  const { data, fetchLogin, fetchSignup, fetchLogout, fetchSession } =
    useFetch<UserSession>();
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState<
    "idle" | "loading" | "success" | "fail"
  >("idle");
  const [error, setError] = useState<Exception | null>(null);

  useEffect(() => {
    if (
      data.content &&
      "id" in data.content &&
      "username" in data.content &&
      "email" in data.content
    ) {
      setUser(data.content);
    }
    setIsLoading(data.status);
    setError(data.error);
  }, [data.error, data.content, data.status]);

  async function signup(payload: UserInfoPayload) {
    await fetchSignup(payload, UserSessionSchema);

    if (data.status === "success") {
      return true;
    }

    return false;
  }

  async function login(payload: UserLoginPayload) {
    await fetchLogin(payload, UserSessionSchema);

    if (data.content?.id) {
      setUser(data.content);
    }

    return user;
  }

  async function logout() {
    try {
      await fetchLogout();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  }

  async function isAuthed() {
    if (user) {
      return user;
    }
    await fetchSession();

    if (data.status === "success" && data.content?.id) {
      setUser(data.content);
      return user;
    } else {
      setUser(null);
      return null;
    }
  }

  return {
    user,
    isLoading,
    error,
    setUser,
    login,
    logout,
    signup,
    isAuthed,
  };
}
