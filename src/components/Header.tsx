import { Link, useLocation } from "react-router-dom";

import { Search } from "../components";
import { useSelector } from "react-redux";
import { selectCart } from "../redux/cart/selectors";
import React, { useRef } from "react";

import { CartIconSvg, PizzaLogoSvg } from "../assets/icon";
import { useIsMounted } from "../hooks/useIsMounted";

export const Header: React.FC = () => {
  const { items, totalPrice } = useSelector(selectCart);
  const totalCount = items.reduce((sum, obj) => obj.count + sum, 0);
  const location = useLocation();

  const isMounted = useIsMounted();

  React.useEffect(() => {
    if (isMounted) {
      const json = JSON.stringify(items);
      localStorage.setItem("cart", json);
    }
  }, [items]);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <PizzaLogoSvg />
            <div className="header__name">
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        {location.pathname !== "/cart" && <Search />}
        <div className="header__cart">
          {location.pathname !== "/cart" && (
            <Link to="/cart" className="button button--cart">
              <span>{totalPrice}</span>
              <div className="button__delimiter"></div>
              <CartIconSvg />
              <span>{totalCount}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
