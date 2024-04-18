import { useState } from "react";
import Button from "../components/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await fetch("http://localhost:3001/api/v1/auth/login", {
      body: JSON.stringify({
        email,
        password,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
    });

    const { user } = await data.json();

    console.log(user);
    // setAuthedUser(user);
    setEmail("");
    setPassword("");
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
              required
            />
          </label>
        </div>

        <Button value="Log in" variant="default" />
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
