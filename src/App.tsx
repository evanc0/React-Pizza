import { useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Header from "./components/Header";
// import FullPizza from "./pages/FullPizza";

import "./scss/app.scss";

function App() {
  const location = useLocation();

  return (
    <div className="wrapper">
      <Header />

      <div className="content">
        {location.pathname === "/cart" && <Cart />}
        {location.pathname === "/" && <Home />}
        {/* {location.pathname === "/pizza/2" && <FullPizza />} */}
        {/* {location.pathname == '*' && } */}
      </div>
    </div>
  );
}

export default App;
