import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setSort } from "../redux/filter/slice";
import { Sort as SortType, SortPropertyEnum } from "../redux/filter/types";

import useWhyDidYouUpdate from "ahooks/lib/useWhyDidYouUpdate";
import React from "react";
import { ArrowUpSvg } from "../assets/icon";

type SortListItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

type SortPopusProps = {
  value: SortType;
};

export const list: SortListItem[] = [
  {
    name: "популярности (по возрастанию)",
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
  {
    name: "популярности (по убыванию)",
    sortProperty: SortPropertyEnum.RATING_ASC,
  },
  { name: "цене (по возрастанию)", sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: "цене (по убыванию)", sortProperty: SortPropertyEnum.PRICE_ASC },
  {
    name: "алфавиту (по возрастанию)",
    sortProperty: SortPropertyEnum.NAME_DESC,
  },
  { name: "алфавиту (по убыванию)", sortProperty: SortPropertyEnum.NAME_ASC },
];

export const Sort: React.FC<SortPopusProps> = React.memo(({ value }) => {
  useWhyDidYouUpdate("Sort", { value });
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const onClickListItem = (obj: SortListItem) => {
    dispatch(setSort(obj));
    setOpen(!open);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <ArrowUpSvg classArrow="sort_arrow" />

        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={
                  value.sortProperty === obj.sortProperty ? "active" : ""
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
