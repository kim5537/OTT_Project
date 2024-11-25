import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "./Root";
import Home from "./pages/Home";
import Tv from "./pages/Tv";
import Search from "./pages/Search";
import Love from "./pages/Love";
import Detail from "./pages/Detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies/:movieId",
        element: <Detail />,
      },
      {
        path: "tv",
        element: <Tv />,
      },
      {
        path: "love",
        element: <Love />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },
]);

export default router;
