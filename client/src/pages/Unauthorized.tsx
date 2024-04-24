import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../utils/hooks/useSession";
import { PuffLoader } from "react-spinners";

const Unauthorized = () => {
  const { user, isLoading } = useSession();

  if (isLoading === "loading") {
    return (
      <div className="flex flex-col w-screen h-screen justify-center items-center">
        <PuffLoader color="#ce36d6" speedMultiplier={0.5} />
      </div>
    );
  }

  console.log("UNAUTHORIZED", user);

  return user ? <Navigate to={"/"} replace /> : <Outlet />;
};

export default Unauthorized;
