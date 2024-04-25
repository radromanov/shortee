import { Link, Outlet } from "react-router-dom";
import { useSession } from "../utils/hooks/useSession";
import Spinner from "../components/Spinner";

const Authorized = () => {
  const { user, guest, isLoading } = useSession();

  if (isLoading === "loading" && !guest) {
    return <Spinner color="purple" />;
  }

  return user ? (
    <Outlet />
  ) : (
    <main className="flex flex-col w-screen h-screen justify-center items-center">
      <h3 className="text-3xl">Authentication required</h3>
      <p className="text-xl">
        <span>
          Please,{" "}
          <Link to="/sign-in">
            <span className="underline text-violet-300">sign in</span>
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
