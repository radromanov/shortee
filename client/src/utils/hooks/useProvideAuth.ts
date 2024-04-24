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
    setError(data.error);
  }, [data]);

  const login = async (payload: UserLoginPayload) => {
    await fetchLogin(payload, UserSessionSchema);
    return user;
  };

  const logout = async () => {
    await fetchLogout();
    setUser(null);
  };

  const signup = async (payload: UserInfoPayload) => {
    await fetchSignup(payload, UserSessionSchema);
    return data.status === "success";
  };

  const isAuthed = async () => {
    await fetchSession();
    return user;
  };

  return {
    user,
    error,
    isLoading: data.status,
    setUser,
    login,
    logout,
    signup,
    isAuthed,
  };
}
