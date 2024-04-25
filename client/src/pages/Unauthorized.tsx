import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../utils/hooks/useSession";
import Spinner from "../components/Spinner";

const Unauthorized = () => {
  const { user, isLoading } = useSession();

  if (isLoading === "loading") {
    return <Spinner color="purple" />;
  }

  return user ? <Navigate to={"/"} replace /> : <Outlet />;
};

export default Unauthorized;
