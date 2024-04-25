import { createBrowserRouter } from "react-router-dom";
import SignUp from "./SignUp";
import Authorized from "./Authorized";
import Home from "./Home";
import Unauthorized from "./Unauthorized";
import SignIn from "./SignIn";

const Router = () => {
  return createBrowserRouter([
    {
      element: <Unauthorized />,
      children: [
        {
          path: "sign-in",
          element: <SignIn />,
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
