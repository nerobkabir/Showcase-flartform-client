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
import DashboardLayout from "../pages/DashboardLayout";
import DashboardOverview from "../pages/DashboardOverview";
import ProfilePage from "../pages/ProfilePage";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Privacy from "../pages/Privacy";




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
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/privacy",
        element: <Privacy />
      },
      {
        path: "/artwork/:id",
        element: <ArtworkDetails />
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

  // Dashboard Routes
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardOverview />
      },
      {
        path: "gallery",
        element: <MyGallery />
      },
      {
        path: "favorites",
        element: <MyFavorites />
      },
      {
        path: "profile",
        element: <ProfilePage />
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />
  },
]);