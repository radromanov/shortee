import { useState } from "react";
import { useSignup } from "../utils/hooks/useSignup";
import Button from "../components/Button";

const SignUp = () => {
  const [formData, setFormData] = useState<{
    email: string;
    username: string;
    password: string;
    confirm: string;
  }>({
    confirm: "",
    email: "",
    password: "",
    username: "",
  });
  const { data, signup } = useSignup();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signup(formData);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  console.log(data, formData);

  return (
    <div>
      <form id="signup-form" onSubmit={handleSignup}>
        <label htmlFor="email">
          <p>
            <span>Email</span>
          </p>
          <input
            disabled={data.status === "loading"}
            className={`${
              data.status === "loading"
                ? "cursor-not-allowed hover:bg-neutral-800"
                : "hover:bg-neutral-700"
            }`}
            name="email"
            value={formData.email}
            onChange={handleInput}
            required
            autoFocus
          />
        </label>

        <label htmlFor="username">
          <p>
            <span>Username</span>
          </p>
          <input
            disabled={data.status === "loading"}
            className={`${
              data.status === "loading"
                ? "cursor-not-allowed hover:bg-neutral-800"
                : "hover:bg-neutral-700"
            }`}
            name="username"
            value={formData.username}
            onChange={handleInput}
            required
          />
        </label>

        <label htmlFor="password">
          <p>
            <span>Password</span>
          </p>
          <input
            disabled={data.status === "loading"}
            className={`${
              data.status === "loading"
                ? "cursor-not-allowed hover:bg-neutral-800"
                : "hover:bg-neutral-700"
            }`}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInput}
            required
          />
        </label>

        <label htmlFor="confirm">
          <p>
            <span>Confirm Password</span>
          </p>
          <input
            disabled={data.status === "loading"}
            className={`${
              data.status === "loading"
                ? "cursor-not-allowed hover:bg-neutral-800"
                : "hover:bg-neutral-700"
            }`}
            name="confirm"
            type="password"
            value={formData.confirm}
            onChange={handleInput}
            required
          />
        </label>

        <Button
          disabled={data.status === "loading"}
          className={`${data.status === "loading" ? "cursor-not-allowed" : ""}`}
          value="Sign up"
          variant="default"
        />
      </form>
      {data.error?.message ? (
        <p>
          <span>{data.error.message}</span>
        </p>
      ) : (
        <></>
      )}
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
