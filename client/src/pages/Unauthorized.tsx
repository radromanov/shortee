import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../utils/hooks/useSession";
import LoadingScreen from "../components/LoadingScreen";

const Unauthorized = () => {
  const { user, isLoading } = useSession();

  if (isLoading === "loading") {
    return <LoadingScreen />;
  }

  return user ? <Navigate to={"/"} replace /> : <Outlet />;
};

export default Unauthorized;
