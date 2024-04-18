import { Navigate, Outlet } from "react-router-dom";

const Unauthorized = () => {
  const authed = false;

  return authed ? <Navigate to={"/"} replace /> : <Outlet />;
};

export default Unauthorized;
