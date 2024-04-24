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
import { PuffLoader } from "react-spinners";
import { useAuth } from "../utils/hooks/useAuth";

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
    <div className="flex flex-col gap-2 justify-center items-center w-screen h-screen">
      <form
        className="flex flex-col w-2/5 gap-2"
        id="signup-form"
        onSubmit={handleSignup}
      >
        <div className="flex flex-col gap-2">
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
        </div>

        <div className="flex flex-col gap-2 items-center w-full">
          {error?.message && (
            <p>
              <span className="text-red-400">{error.message}</span>
            </p>
          )}
          <Button
            disabled={isLoading === "loading"}
            className={`w-full ${
              isLoading === "loading" ? "cursor-not-allowed" : ""
            }`}
            text={
              isLoading === "loading" ? (
                <div className="flex justify-center items-center">
                  <PuffLoader size={24} color="white" speedMultiplier={0.5} />
                </div>
              ) : (
                "Sign up"
              )
            }
            variant="default"
          />
        </div>
      </form>
      <p>
        Already have an account?{" "}
        <a className="underline text-violet-300" href="/login">
          Log in
        </a>
        .
      </p>
    </div>
  );
};

export default SignUp;
