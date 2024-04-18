import { FormEvent, useState } from "react";
import Login from "./pages/Login";

function App() {
  const [authedUser, setAuthedUser] = useState<{
    id: string;
    email: string;
    username: string;
  } | null>();

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
        <Login />
      )}
    </main>
  );
}

export default App;
