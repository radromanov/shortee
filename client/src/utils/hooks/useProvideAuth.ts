import { useState } from "react";

export default function useProvideAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<{
    id: string;
    email: string;
    username: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function login(
    payload: { email: string; password: string },
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

    setIsLoading(false);

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
      return false;
    }

    setUser(data);
    return true;
  }

  return { isLoading, setIsLoading, user, setUser, error, setError, login };
}
