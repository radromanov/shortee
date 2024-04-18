import { createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Authorized from "./Authorized";
import Home from "./Home";
import Unauthorized from "./Unauthorized";

const Router = () => {
  return createBrowserRouter([
    {
      element: <Unauthorized />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "sign-up",
          element: <SignUp />,
        },
      ],
    },
    {
      element: <Authorized />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
  ]);
};

export default Router;
