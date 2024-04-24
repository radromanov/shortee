import { Link, Outlet } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { useSession } from "../utils/hooks/useSession";

const Authorized = () => {
  const data = useSession();

  console.log(data);

  if (data.status === "loading") {
    return (
      <div className="flex flex-col w-screen h-screen justify-center items-center">
        <PuffLoader color="#ce36d6" speedMultiplier={0.5} />
      </div>
    );
  }

  return data.content?.id ? (
    <Outlet />
  ) : (
    <main className="flex flex-col w-screen h-screen justify-center items-center">
      <h3 className="text-3xl">Authentication required</h3>
      <p className="text-xl">
        <span>
          Please,{" "}
          <Link to="/login">
            <span className="underline text-violet-300">log in</span>
          </Link>{" "}
          or{" "}
          <Link to="/sign-up">
            <span className="underline text-violet-300">create an account</span>
          </Link>
          .
        </span>
      </p>
    </main>
  );
};

export default Authorized;
