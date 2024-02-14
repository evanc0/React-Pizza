import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundBlockPage from "./components/NotFoundBlock/NotFoundBlockPage.jsx";

import { store } from "./redux/store";
import { Provider } from "react-redux";
import FullPizza from "./pages/FullPizza";
import MainLayout from "./loyouts/MainLayout";
// import MainLoyout from "./loyouts/MainLoyout.jsx";

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
          element: <FullPizza />,
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
