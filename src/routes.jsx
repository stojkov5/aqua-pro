import { createBrowserRouter } from "react-router";
import Layout from "../src/Layout/Layout";
import Home from "../src/pages/Home";
import About from "../src/pages/About";
import Programs from "../src/pages/Programs";
import Coaches from "../src/pages/Coaches";
import Levels from "../src/pages/Levels";
import Schedule from "../src/components/Schedule";
import CompetitionSquad from "../src/components/CompetitionSquad";
import TeamShop from "../src/pages/TeamShop";
import Cart from "../src/components/Cart";
import Gallery from "../src/components/Gallery";
import PrivacyPolicy from "../src/components/PrivacyPolicy";
import Contact from "../src/pages/Contact";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      { path: "/levels", element: <Levels /> },
      {
        path: "/programs",
        element: <Programs />,
      },
      {
        path: "/team",
        element: <Coaches />,
      },
      {
        path: "/schedule",
        element: <Schedule />,
      },
      {
        path: "/squad",
        element: <CompetitionSquad />,
      },
      {
        path: "/shop",
        element: <TeamShop />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/faq",
        element: <PrivacyPolicy />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);

export default routes;
