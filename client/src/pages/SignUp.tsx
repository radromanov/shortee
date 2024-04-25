import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import {
  ConfirmPasswordSchema,
  EmailSchema,
  PasswordSchema,
  UserInfoPayload,
  UsernameSchema,
} from "../utils/types/User.type";
import { useAuth } from "../utils/hooks/useAuth";
import PageWrapper from "../components/PageWrapper";
import { Link } from "react-router-dom";
import Form from "../components/Form";
import Spinner from "../components/Spinner";

const SignUp = () => {
  const [formData, setFormData] = useState<UserInfoPayload>({
    confirmPassword: "",
    email: "",
    password: "",
    username: "",
  });

  const { isLoading, error, signup, login } = useAuth();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await signup(formData);

    if (success) {
      await login({ email: formData.email, password: formData.password });
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <PageWrapper>
      <Form
        id="signup-form"
        error={error}
        isLoading={isLoading === "loading"}
        onSubmit={handleSignup}
      >
        <Input
          text="email"
          type="email"
          value={formData.email}
          onChange={handleInput}
          disabled={isLoading === "loading"}
          autoFocus={true}
          schema={EmailSchema}
        />

        <Input
          text="username"
          type="text"
          value={formData.username}
          onChange={handleInput}
          disabled={isLoading === "loading"}
          schema={UsernameSchema}
        />

        <Input
          text="password"
          type="password"
          value={formData.password}
          onChange={handleInput}
          disabled={isLoading === "loading"}
          schema={PasswordSchema}
        />

        <Input
          text="confirm password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInput}
          disabled={isLoading === "loading"}
          schema={ConfirmPasswordSchema}
        />

        <Button
          isLoading={isLoading === "loading"}
          text={isLoading === "loading" ? <Spinner size={24} /> : "Sign up"}
          variant="default"
          className="h-8"
        />
      </Form>

      <p>
        Already have an account?{" "}
        <Link className="underline text-violet-300" to="/login">
          Log in
        </Link>
        .
      </p>
    </PageWrapper>
  );
};

export default SignUp;
