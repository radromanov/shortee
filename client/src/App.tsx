import { FormEvent, useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(e.target);

    setFormData({ email, password });

    console.log(formData);
    await fetch("http://localhost:3001/api/v1/user/login", {
      body: JSON.stringify(formData),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
    });

    setEmail("");
    setPassword("");
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <form id="login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            <p>
              <span>Email</span>
            </p>
            <input
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
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
              onChange={(e) => setPassword(e.currentTarget.value)}
              name="password"
              id="password"
              type="password"
              required
            />
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default App;
