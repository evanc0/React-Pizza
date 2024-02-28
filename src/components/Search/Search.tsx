import React, { useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";

import styles from "./Search.module.scss";

import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/filter/slice";
import { SeacrhSvg, CloseSearchSvg } from "../../assets/icon";

export const Search: React.FC = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 400),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <SeacrhSvg searchSvgClass={styles.icon} />
      <input
        ref={inputRef}
        onChange={onChangeInput}
        value={value}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <CloseSearchSvg
          onClickClear={onClickClear}
          closeSearchSvgClass={styles.clearIcon}
        />
      )}
    </div>
  );
};
