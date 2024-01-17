import { createContext, useState } from "react";

import { useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Header from "./components/Header";

import "./scss/app.scss";

export const SearchContext = createContext("");

// console.log(SearchContext);

function App() {
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header withSearch />
        <div className="content">
          {location.pathname === "/cart" && <Cart />}
          {location.pathname === "/" && <Home />}
          {/* {location.pathname == '*' && } */}
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
