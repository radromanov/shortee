import { FormEvent, useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [authedUser, setAuthedUser] = useState<{
    id: string;
    email: string;
    username: string;
  } | null>();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
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
    setAuthedUser(user);
    setEmail("");
    setPassword("");
  };

  const handleLogout = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await fetch("http://localhost:3001/api/v1/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
    });

    const { user } = await data.json();

    if (!user) {
      setAuthedUser(null);
    }
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      {authedUser?.id ? (
        <>
          <p>
            <span>{JSON.stringify(authedUser)}</span>
          </p>
          <form onSubmit={handleLogout}>
            <button type="submit">Logout</button>
          </form>
        </>
      ) : (
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

          <button type="submit">Submit</button>
        </form>
      )}
    </main>
  );
}

export default App;
