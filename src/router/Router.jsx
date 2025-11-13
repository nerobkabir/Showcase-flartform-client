import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import AddArtwork from "../pages/AddArtwork";
import PrivateRoute from "../pages/PrivateRoute";
import ExploreArtworks from "../pages/ExploreArtworks";
import ArtworkDetails from "../pages/ArtworkDetails";
import MyGallery from "../pages/MyGallery";
import MyFavorites from "../pages/MyFavorites";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/add",
        element: <PrivateRoute>
          <AddArtwork />
        </PrivateRoute>
      },
      {
        path: "/explore",
        element: <ExploreArtworks />
      }, {
        path: "/artwork/:id",
        element: <PrivateRoute>
          <ArtworkDetails />
        </PrivateRoute>
      },
      {
        path: "/gallery",
        element: <PrivateRoute>
          <MyGallery />
        </PrivateRoute>
      },
      {
        path: "/favorites",
        element: (
          <PrivateRoute>
            <MyFavorites />
          </PrivateRoute>
        ),
      },

      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },

    ],
  },

  {
    path: "*",
    element: <NotFound />
  },
]);
