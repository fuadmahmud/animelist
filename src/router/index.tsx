import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Detail from "../pages/Detail";
import Collection from "../pages/Collection";
import CollectionDetail from "../pages/CollectionDetail";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: '/:id',
        element: <Detail />
      },
      {
        path: '/collection',
        element: <Collection />
      },
      {
        path: '/collection/:id',
        element: <CollectionDetail />
      }
    ],
    errorElement: <NotFound />
  }
]);