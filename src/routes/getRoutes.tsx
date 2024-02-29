import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import FullPizza from "../pages/FullPizza";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import MainLayout from "../layouts/MainLayout";
import { NotFound } from "../pages/NotFound";

export const router = createBrowserRouter(
  [
    {
      children: [
        {
          path: "/pizza/:id",
          element: (
            <Suspense fallback={<div>Идёт загрузка...</div>}>
              <FullPizza />
            </Suspense>
          ),
        },
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
      element: <MainLayout />,
    },
  ],
  { basename: "/" }
);
