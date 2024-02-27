import { Link, useLocation } from "react-router-dom";

import { Search } from "../components/index";
import { useSelector } from "react-redux";
import { selectCart } from "../redux/cart/selectors";
import React, { useRef } from "react";

import { CartIcon } from "../assets/img/CartIcon";
import logoSvg from "../assets/img/pizza-logo.svg";

export const Header: React.FC = () => {
  const { items, totalPrice } = useSelector(selectCart);
  const totalCount = items.reduce(
    (sum: number, obj: any) => obj.count + sum,
    0
  );
  const location = useLocation();

  const isMounted = useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);

      localStorage.setItem("cart", json);
    }
    isMounted.current = true;
  }, [items]);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logoSvg} alt="Pizza logo" />
            <div>
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
              <CartIcon />
              <span>{totalCount}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
