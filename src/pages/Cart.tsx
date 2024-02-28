import React from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { CartItem, CartEmpty } from "../components";

import { clearItems } from "../redux/cart/slice.js";
import { selectCart } from "../redux/cart/selectors.js";

import { BackArrowSvg, BasketSvg, BigCartSvg } from "../assets/icon";

const Cart: React.FC = () => {
  const { items, totalPrice } = useSelector(selectCart);
  const dispatch = useDispatch();

  const totalCount = items.reduce(
    (sum: number, obj: any) => obj.count + sum,
    0
  );

  const onClickClear = () => {
    if (window.confirm("Очистить корзину?")) {
      dispatch(clearItems());
    }
  };

  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            {/* <img src={bigCart} alt="" /> */}
            <BigCartSvg />
            Корзина
          </h2>
          <div onClick={onClickClear} className="cart__clear">
            <BasketSvg />
            <span>Очистить корзину</span>
          </div>
        </div>
        <div className="content__items">
          {items.map((item: any) => (
            <CartItem {...item} key={item.id} />
          ))}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              {" "}
              Всего пицц: <b>{totalCount} шт.</b>{" "}
            </span>
            <span>
              {" "}
              Сумма заказа: <b>{totalPrice} ₽</b>{" "}
            </span>
          </div>

          <div className="cart__bottom-buttons">
            <Link
              to="/"
              className="button button--outline button--add go-back-btn"
            >
              <BackArrowSvg />

              <span>Вернуться назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
