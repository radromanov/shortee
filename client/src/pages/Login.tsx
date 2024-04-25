import React, { useState } from "react";
import Button from "../components/Button";
import { useAuth } from "../utils/hooks/useAuth";
import PageWrapper from "../components/PageWrapper";
import Input from "../components/Input";
import { EmailSchema, PasswordSchema } from "../utils/types/User.type";

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
    <PageWrapper>
      <form
        className="flex flex-col w-3/12 gap-4"
        id="login-form"
        onSubmit={handleLogin}
      >
        <div>
          <Input
            text="email"
            value={formData.email}
            onChange={handleInput}
            type="email"
            id="email"
            name="email"
            schema={EmailSchema}
            disabled={isLoading === "loading"}
            autoFocus
          />

          <Input
            text="password"
            value={formData.password}
            onChange={handleInput}
            type="password"
            id="password"
            name="password"
            schema={PasswordSchema}
            disabled={isLoading === "loading"}
          />
        </div>

        {error?.message && (
          <p>
            <span className="text-red-500">{error.message}</span>
          </p>
        )}

        <Button
          disabled={isLoading === "loading"}
          text="Log in"
          variant="default"
          className="w-full"
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
    </PageWrapper>
  );
};

export default Login;
