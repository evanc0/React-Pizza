import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addItem } from "../../redux/cart/slice";
import { CartItem } from "../../redux/cart/types";
import { selectCartItemById } from "../../redux/cart/selectors";
import { Link } from "react-router-dom";
import { PlusCartItemSvg } from "../../assets/icon";
import { ValueOf } from "../../const/types";
import { TypePizza } from "../../const/const";

type PizzaBlockProps = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: ValueOf<typeof TypePizza>[];
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
  const [activeType, setActiveType] = useState<ValueOf<typeof TypePizza>>(
    types[0]
  );

  const [activeSize, setActiveSize] = useState<number>(sizes[0]);

  const cartItem = useSelector(selectCartItemById(id));
  const dispatch = useDispatch();

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      name,
      price,
      imageUrl,
      types: activeType,
      sizes: activeSize,
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
                onClick={() =>
                  setActiveType((prevState) =>
                    prevState === TypePizza.SLIM
                      ? TypePizza.TRADITIONAL
                      : TypePizza.SLIM
                  )
                }
                className={activeType === type ? "active" : ""}
                key={index}
              >
                {type === TypePizza.SLIM ? "тонкое" : "традиционное"}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                onClick={() => setActiveSize(size)}
                className={activeSize === size ? "active" : ""}
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
