import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../utils/hooks/useSession";
import { useAuth } from "../utils/hooks/useAuth";
import { PuffLoader } from "react-spinners";

const Unauthorized = () => {
  const authed = useSession();
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex flex-col w-screen h-screen justify-center items-center">
        <PuffLoader color="#ce36d6" speedMultiplier={0.5} />
      </div>
    );
  }

  return authed?.id ? <Navigate to={"/"} replace /> : <Outlet />;
};

export default Unauthorized;
