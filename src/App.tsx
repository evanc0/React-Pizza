import React from "react";
import Loadable from "react-loadable";
import { useLocation } from "react-router-dom";

import "./scss/app.scss";

import Home from "./pages/Home";
import { Header } from "./components/Header";
// import Cart from "./pages/Cart";

const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart"*/ "./pages/Cart")
);

//Способ ниже почему то не работает
// const Cart = Loadable({
//   loader: () => import("./pages/Cart"),
//   loading: () => <div>Идёт загрузка корзины....</div>,
// });

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
