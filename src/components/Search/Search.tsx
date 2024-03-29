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
      dispatch(setSearchValue(str.trim().replace(/\s+/g, " ")));
    }, 400),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trimStart();
    setValue(value);
    updateSearchValue(value);
  };

  return (
    <div className={styles.root}>
      <SeacrhSvg className={styles.icon} />
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
          className={styles.clearIcon}
        />
      )}
    </div>
  );
};
