import { useLocation } from "react-router-dom";

import Home from "./pages/Home";
// import Cart from "./pages/Cart";
import Header from "./components/Header";

import "./scss/app.scss";
import React from "react";

const Cart = React.lazy(() => import("./pages/Cart"));

function App() {
  const location = useLocation();

  return (
    <div className="wrapper">
      <Header />

      <div className="content">
        {location.pathname === "/cart" && (
          <React.Suspense fallback={<div>Идёт загрузка корзины....</div>}>
            <Cart />
          </React.Suspense>
        )}
        {location.pathname === "/" && <Home />}
        {/* {location.pathname === "/pizza/2" && <FullPizza />} */}
        {/* {location.pathname == '*' && } */}
      </div>
    </div>
  );
}

export default App;
