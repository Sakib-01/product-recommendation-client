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
import MyQuery from "../pages/MyQuery";
import UpdateQuery from "../pages/UpdateQuery";
import MyRecommendation from "../pages/MyRecommendation";
import RecommendationsForMe from "../pages/RecommendationsForMe";
import PrivateRoute from "./PrivateRoute";
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
        element: (
          <PrivateRoute>
            <QueryDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/recommendationsForMe",
        element: (
          <PrivateRoute>
            <RecommendationsForMe />
          </PrivateRoute>
        ),
      },
      {
        path: "/addQuery",
        element: (
          <PrivateRoute>
            <AddQuery />
          </PrivateRoute>
        ),
      },
      {
        path: "/updateQuery/:id",
        element: (
          <PrivateRoute>
            <UpdateQuery />
          </PrivateRoute>
        ),
      },
      {
        path: "/myQuery",
        element: (
          <PrivateRoute>
            <MyQuery />
          </PrivateRoute>
        ),
      },
      {
        path: "/myRecomendation",
        element: (
          <PrivateRoute>
            <MyRecommendation />
          </PrivateRoute>
        ),
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
