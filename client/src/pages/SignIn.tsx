import React, { useState } from "react";
import Button from "../components/Button";
import { useAuth } from "../utils/hooks/useAuth";
import PageWrapper from "../components/PageWrapper";
import Input from "../components/Input";
import { EmailSchema, PasswordSchema } from "../utils/types/User.type";
import Form from "../components/Form";
import Spinner from "../components/Spinner";
import InitialFooter from "../components/InitialFooter";
import InputWrapper from "../components/InputWrapper";

const SignIn = () => {
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
      <Form id="login-form" error={error} onSubmit={handleLogin}>
        <InputWrapper>
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
        </InputWrapper>

        <Button
          isLoading={isLoading === "loading"}
          text={isLoading === "loading" ? <Spinner size={24} /> : "Sign in"}
          variant="default"
          className="w-full"
        />
      </Form>

      <InitialFooter linkText="sign up">Don't have an account?</InitialFooter>
    </PageWrapper>
  );
};

export default SignIn;
