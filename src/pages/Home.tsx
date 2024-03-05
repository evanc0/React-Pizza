import React, { useEffect, useRef, useState } from "react";

import qs from "qs";
//@ts-ignore ранее эта строка была выше, но я установил типы для qs "npm install @types/qs"

import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { useSelector } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/filter/slice";

import {
  Sort,
  Categories,
  Skeleton,
  PizzaBlock,
  Pagination,
} from "../components";

import { selectFilter } from "../redux/filter/selectors";
import { selectPizzaData } from "../redux/pizza/selectors";
import { fetchPizzas } from "../redux/pizza/asyncActions";
import { SearchPizzaParams } from "../redux/pizza/types";
import { useAppDispatch } from "../redux/store";
import { sortList } from "../const/const";
import { useIsMounted } from "../hooks/useIsMounted";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMounted = useIsMounted();
  const [searchParams, setSearchParams] = useSearchParams();

  const { items, status, paginationInfo } = useSelector(selectPizzaData);
  const { categoryId, currentPage, sort, searchValue } =
    useSelector(selectFilter);
  selectFilter;

  const onChangeCategory = React.useCallback((index: number) => {
    dispatch(setCurrentPage(1));
    dispatch(setCategoryId(index));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const { sortBy, category, page, search } = Object.fromEntries(
      searchParams.entries()
    );

    const localSort = sort.sortProperty || sortBy || "rating";
    const localSearch = searchValue || search;
    const localCategory =
      categoryId === 0 ? "" : (categoryId && String(categoryId)) || category;
    const localPage = String(currentPage) || page || "1";

    dispatch(
      fetchPizzas({
        sortBy: localSort,
        search: localSearch,
        category: localCategory,
        currentPage: localPage,
      })
    );

    window.scrollTo(0, 0);
  };

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
  useEffect(() => {
    if (searchParams.size) {
      const { sortBy, category, page, search } = Object.fromEntries(
        searchParams.entries()
      );
      const sort = sortList.find((obj) => obj.sortProperty === sortBy);

      dispatch(
        setFilters({
          categoryId: Number(category),
          currentPage: Number(page),
          sort: sort || sortList[0],
          searchValue: search,
        })
      );
      return;
    }
    setSearchParams(`sortBy=rating&category=1&page=1`);
  }, []);

  useEffect(() => {
    if (isMounted) {
      let queryString = qs.stringify({
        sortBy: sort.sortProperty,
        category: categoryId,
        page: currentPage,
      });
      if (searchValue)
        queryString = queryString.concat(`&search=${searchValue}`);

      setSearchParams(queryString);
    }

    window.scrollTo(0, 0);

    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const blankArray = new Array(4).fill(0).map((item, index) => {
    return { id: Date.now() + index };
  });
  const skeletons = blankArray.map((obj) => <Skeleton key={obj.id} />);
  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort currentSort={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить питсы. Попробуйте повторить попытку
            позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination
        total_items={0}
        total_pages={0}
        per_page={0}
        onChangePage={onChangePage}
        currentPage={currentPage}
        {...paginationInfo}
      />
    </div>
  );
};

export default Home;
