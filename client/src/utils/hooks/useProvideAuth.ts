import { useState } from "react";
import {
  UserSession,
  UserLoginPayload,
  UserSessionSchema,
  UserInfoPayload,
} from "../types/User.type";
import { useFetch } from "./useFetch";

export default function useProvideAuth() {
  const { data, fetchLogin, fetchSignup, fetchLogout, fetchSession } =
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

  async function isAuthed() {
    await fetchSession();

    if (data.status === "success" && data.content?.id) {
      return setUser(data.content);
    } else {
      return setUser(null);
    }
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
