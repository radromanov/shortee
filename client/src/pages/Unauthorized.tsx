import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../utils/hooks/useSession";
import Spinner from "../components/Spinner";

const Unauthorized = () => {
  const { user, isLoading } = useSession();

  if (isLoading === "loading") {
    return <Spinner color="#ce36d6" />;
  }

  return user ? <Navigate to={"/"} replace /> : <Outlet />;
};

export default Unauthorized;
