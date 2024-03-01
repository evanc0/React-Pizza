import { FC, memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setSort } from "../redux/filter/slice";
import { Sort as SortType, SortListItem } from "../redux/filter/types";

import { ArrowUpSvg } from "../assets/icon";
import { sortList } from "../const/const";
import { useClickOutside } from "../hooks/useClickOutside";

type SortPopusProps = {
  value: SortType;
};

export const Sort: FC<SortPopusProps> = memo(({ value }) => {
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const onClickListItem = (obj: SortListItem) => {
    dispatch(setSort(obj));
    setOpen(!open);
  };

  useClickOutside<HTMLDivElement>({
    ref: sortRef,
    handler: () => {
      setOpen(false);
    },
  });

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <ArrowUpSvg className="sort_arrow" />

        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, i) => (
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
