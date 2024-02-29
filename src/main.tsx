import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import "./scss/app.scss";

import { store } from "./redux/store";
import { Provider } from "react-redux";

import { router } from "./routes/getRoutes";

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
