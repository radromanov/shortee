import { useState } from "react";
import {
  UserSession,
  UserLoginPayload,
  UserSessionSchema,
  UserInfoPayload,
} from "../types/User.type";
import { useFetch } from "./useFetch";

export default function useProvideAuth() {
  const { data, fetchLogin, fetchSignup, fetchLogout, fetchGet } =
    useFetch<UserSession>();
  const [user, setUser] = useState<UserSession | null>(null);

  async function signup(payload: UserInfoPayload) {
    await fetchSignup(payload, UserSessionSchema);

    return data;
  }

  async function login(payload: UserLoginPayload) {
    await fetchLogin(payload, UserSessionSchema);

    if (data.content?.id) {
      setUser(data.content);
    }

    return data;
  }

  async function logout() {
    await fetchLogout();

    if (data.status === "success") {
      setUser(null);
    }

    return data;
  }

  async function isAuthed(url: string = "http://localhost:3001/api/v1/auth") {
    await fetchGet(url);

    if (data.content?.id) {
      return setUser(data.content);
    }

    return setUser(null);
  }

  return {
    data,
    user,
    setUser,
    login,
    logout,
    signup,
    isAuthed,
  };
}
