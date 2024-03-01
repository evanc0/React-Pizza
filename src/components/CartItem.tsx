import { useDispatch } from "react-redux";
import { addItem, minusItem, removeItem } from "../redux/cart/slice";
import { CartItem as CartItemType } from "../redux/cart/types";
import React from "react";
import { MinusSvg, CloseSvg } from "../assets/icon";

// Если есть необходимость добавить типизацию для доп пропсов в компоненте, пишем type CartProps = {*тут типизируем новые пропсы*} & Pick*Продолжаем писать*
type CartProps = Pick<
  CartItemType,
  "id" | "name" | "types" | "sizes" | "price" | "count" | "imageUrl" | "rating"
>;

export const CartItem: React.FC<CartProps> = ({
  id,
  name,
  types,
  sizes,
  price,
  count,
  imageUrl,
  rating,
}) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(
      addItem({
        id,
        name,
        types,
        sizes,
        price,
        count,
        imageUrl,
        rating,
      })
    );
  };

  const onClickMinus = () => {
    console.log({ count, name });
    if (count === 1) {
      onClickRemove();
      return;
    }

    dispatch(minusItem(id));
  };

  const onClickRemove = () => {
    //TODO: ДОБАВЬ МОДАЛКУ
    if (window.confirm("Ты действительно хочешь удалить товар?")) {
      dispatch(removeItem(id));
    }
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Minus" />
      </div>
      <div className="cart__item-info">
        <h3>{name}</h3>
        <p>
          {types}, {sizes} см.
        </p>
      </div>
      <div className="cart__item-count">
        <button
          // disabled={count === 1}
          onClick={onClickMinus}
          className="button button--outline button--circle cart__item-count-minus"
        >
          <MinusSvg />
        </button>
        <b>{count}</b>
        <button
          onClick={onClickPlus}
          className="button button--outline button--circle cart__item-count-plus"
        >
          <MinusSvg />
        </button>
      </div>
      <div className="cart__item-price">
        <b>{price * count} ₽</b>
      </div>
      <div className="cart__item-remove">
        <div
          onClick={onClickRemove}
          className="button button--outline button--circle"
        >
          <CloseSvg />
        </div>
      </div>
    </div>
  );
};
