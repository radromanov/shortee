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
import Form from "../components/Form";
import Spinner from "../components/Spinner";
import InitialFooter from "../components/InitialFooter";
import InputWrapper from "../components/InputWrapper";

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
      <Form id="signup-form" error={error} onSubmit={handleSignup}>
        <InputWrapper>
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
        </InputWrapper>

        <Button
          isLoading={isLoading === "loading"}
          text={isLoading === "loading" ? <Spinner size={24} /> : "Sign up"}
          variant="default"
          className="w-full"
        />
      </Form>

      <InitialFooter linkText="Sign in">Already have an account?</InitialFooter>
    </PageWrapper>
  );
};

export default SignUp;
