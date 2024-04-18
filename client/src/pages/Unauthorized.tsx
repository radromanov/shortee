import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utils/hooks/useAuth";

const Unauthorized = () => {
  const { user } = useAuth();

  return user?.id ? <Navigate to={"/"} replace /> : <Outlet />;
};

export default Unauthorized;
