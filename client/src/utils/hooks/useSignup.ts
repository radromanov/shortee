import { useEffect, useState } from "react";

export const useSignup = () => {
  const [data, setData] = useState<{
    status: "loading" | "success" | "fail" | "idle";
    error: {
      message: string;
      exception: string;
      status: number;
      stack: string | null;
    } | null;
    user: { username: string; email: string; id: string } | null;
  }>({ status: "idle", error: null, user: null });

  useEffect(() => {
    const timer = setTimeout(
      () => setData((prev) => ({ ...prev, status: "idle" })),
      3000
    );

    return () => {
      clearTimeout(timer);
    };
  }, [data.error, data.user?.id]);

  const signup = (user: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
    setData((prev) => ({
      ...prev,
      status: "loading",
      error: null,
    }));

    return fetch("http://localhost:3001/api/v1/user/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if ("exception" in data) {
          return setData((prev) => ({
            ...prev,
            user: null,
            error: data,
            status: "fail",
          }));
        }

        return setData((prev) => ({
          ...prev,
          user: data,
          error: null,
          status: "success",
        }));
      })
      .catch((e) =>
        setData((prev) => ({
          ...prev,
          status: "fail",
          error: e.message || "Something went wrong.",
          user: null,
        }))
      );
  };

  return { data, signup };
};
