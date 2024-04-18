import { ProvideAuth } from "./utils/contexts/AuthContext";
import { RouterProvider } from "react-router-dom";
import Router from "./pages/Router";

function App() {
  return (
    <ProvideAuth>
      <RouterProvider router={Router()} />
    </ProvideAuth>
  );
}

export default App;
