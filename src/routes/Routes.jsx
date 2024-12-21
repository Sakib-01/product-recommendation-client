import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import SignIn from "../pages/Authentication/SignIn";
import Register from "../pages/Authentication/Register";
import ErrorPage from "../pages/ErrorPage";
import AddQuery from "../pages/AddQuery";
import Queries from "../pages/Queries";
import QueryDetails from "../pages/QueryDetails";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/queries",
        element: <Queries />,
      },
      {
        path: "/queryDetails/:id",
        element: <QueryDetails />,
      },
      {
        path: "/addQuery",
        element: <AddQuery />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
