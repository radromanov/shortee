import { Outlet } from "react-router-dom";

const Authorized = () => {
  const authed = false;

  return authed ? (
    <Outlet />
  ) : (
    <main className="flex flex-col w-screen h-screen justify-center items-center">
      <h3 className="text-3xl">Authentication required</h3>
      <p className="text-xl">
        <span>
          Please,{" "}
          <a className="underline text-violet-300" href="/login">
            log in
          </a>{" "}
          or{" "}
          <a className="underline text-violet-300" href="/sign-up">
            create an account
          </a>
          .
        </span>
      </p>
    </main>
  );
};

export default Authorized;
