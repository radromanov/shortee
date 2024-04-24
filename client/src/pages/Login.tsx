import { useState } from "react";
import Button from "../components/Button";
import { useAuth } from "../utils/hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, data } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await login({ email, password });

    if (success) {
      setEmail("");
      setPassword("");
    }
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              id="email"
              type="email"
              disabled={data.status === "loading"}
              required
              autoFocus
            />
          </label>

          <label htmlFor="password">
            <p>
              <span>Password</span>
            </p>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              id="password"
              type="password"
              disabled={data.status === "loading"}
              required
            />
          </label>
        </div>

        {data.error?.message ? (
          <p>
            <span className="text-red-500">{data.error.message}</span>
          </p>
        ) : (
          <></>
        )}
        <Button
          disabled={data.status === "loading"}
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
