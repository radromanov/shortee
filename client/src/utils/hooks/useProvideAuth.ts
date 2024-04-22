import { useState } from "react";
import { User, UserLoginInfo } from "../types/User.type";
import { Exception } from "../types/Error.type";

export default function useProvideAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<Exception | null>(null);

  async function login(
    payload: UserLoginInfo,
    url: string = "http://localhost:3001/api/v1/auth/login"
  ) {
    setIsLoading(true);
    setError(null);

    const response = await fetch(url, {
      body: JSON.stringify(payload),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    });

    const data = await response.json();
    setIsLoading(false);

    if (!response.ok) {
      setError({ message: data.message, status: data.status });
      return false;
    }

    setUser(data.user);
    return true;
  }

  async function logout(
    url: string = "http://localhost:3001/api/v1/auth/logout"
  ) {
    setIsLoading(true);
    setError(null);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    });

    const data = await response.json();
    setIsLoading(false);

    if (!response.ok) {
      setError({ message: data.message, status: data.status });
      return false;
    }

    setUser(null);
    return true;
  }

  async function isAuthed(url: string = "http://localhost:3001/api/v1/auth") {
    setIsLoading(true);
    setError(null);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    });

    const data = await response.json();
    setIsLoading(false);

    if (!response.ok) {
      return;
    }

    return setUser(data);
  }

  return {
    isLoading,
    setIsLoading,
    user,
    setUser,
    error,
    setError,
    login,
    logout,
    isAuthed,
  };
}
