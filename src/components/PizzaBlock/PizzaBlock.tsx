import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addItem } from "../../redux/cart/slice";
import { CartItem } from "../../redux/cart/types";
import { selectCartItemById } from "../../redux/cart/selectors";
import { Link } from "react-router-dom";
import { PlusCartItemSvg } from "../../assets/icon";

const typeNames = ["тонкое", "традиционное"];

type PizzaBlockProps = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  name,
  price,
  imageUrl,
  sizes,
  types,
  rating,
}) => {
  const [activeType, setActiveType] = useState<number>(0);
  const [activeSize, setActiveSize] = useState<number>(0);

  const cartItem = useSelector(selectCartItemById(id));
  const dispatch = useDispatch();

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      name,
      price,
      imageUrl,
      types: typeNames[activeType],
      sizes: sizes[activeSize],
      count: 0,
      rating,
    };

    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{name}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type, index) => (
              <li
                onClick={() => setActiveType(index)}
                className={activeType === index ? "active" : ""}
                key={index}
              >
                {type === 0 ? "тонкое" : "традиционное"}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? "active" : ""}
                key={index}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <PlusCartItemSvg />
            <span>Добавить</span>
            {!!addedCount && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};
