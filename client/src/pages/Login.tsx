import React, { useState } from "react";
import Button from "../components/Button";
import { useAuth } from "../utils/hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";

const Login = () => {
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    { email: "", password: "" }
  );
  const { login, isLoading, error } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await login(formData);

    if (success) {
      setFormData({ email: "", password: "" });
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <form id="login-form" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">
            <p>
              <span>Email</span>
            </p>
            <input
              value={formData.email}
              onChange={handleInput}
              name="email"
              id="email"
              type="email"
              disabled={isLoading === "loading"}
              required
              autoFocus
            />
          </label>

          <label htmlFor="password">
            <p>
              <span>Password</span>
            </p>
            <input
              value={formData.password}
              onChange={handleInput}
              name="password"
              id="password"
              type="password"
              disabled={isLoading === "loading"}
              required
            />
          </label>
        </div>

        {error?.message && (
          <p>
            <span className="text-red-500">{error.message}</span>
          </p>
        )}

        {isLoading === "loading" && <LoadingScreen />}

        <Button
          disabled={isLoading === "loading"}
          text="Log in"
          variant="default"
        />
      </form>
      <p>
        <span>
          Don't have an account?{" "}
          <a className="underline text-violet-300" href="/sign-up">
            Sign up
          </a>
          .
        </span>
      </p>
    </div>
  );
};

export default Login;
