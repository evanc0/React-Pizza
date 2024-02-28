import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { store } from "./redux/store";
import { Provider } from "react-redux";
import { NotFoundBlockPage } from "./components/NotFoundBlock/NotFoundBlockPage.jsx";
import MainLayout from "./layouts/MainLayout";

const FullPizza = React.lazy(
  () => import(/* webpackChunkName: "FullPizza"*/ "./pages/FullPizza")
);
// const NotFoundBlockPage = React.lazy(
//   () =>
//     import(
//       /* webpackChunkName: "NotFoundBlockPage"*/ "./components/NotFoundBlock/NotFoundBlockPage"
//     )
// );

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/cart",
      element: <App />,
    },
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
      ],
      element: <MainLayout />,
    },
    {
      path: "*",
      element: <NotFoundBlockPage />,
    },
  ],
  { basename: "/" }
);

const rootElem = document.getElementById("root");

if (rootElem) {
  ReactDOM.createRoot(rootElem).render(
    // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    // </React.StrictMode>,
  );
}
