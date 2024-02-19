import React, { useEffect, useRef } from "react";
//@ts-ignore
import qs from "qs";

import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import {
  FilterSliseState,
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import SortPopup, { list } from "../components/SortPopup";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";

import {
  SearchPizzaParams,
  fetchPizzas,
  selectPizzaData,
} from "../redux/slices/pizzaSlice";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status, paginationInfo } = useSelector(selectPizzaData);
  const { categoryId, currentPage, sort, searchValue } =
    useSelector(selectFilter);

  const onChangeCategory = (index: number) => {
    dispatch(setCurrentPage(1));
    dispatch(setCategoryId(index));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue && `&name=*${searchValue}`;
    const sortBy = sort.sortProperty;
    dispatch(
      fetchPizzas({
        sortBy,
        search,
        category,
        currentPage,
      })
    );

    window.scrollTo(0, 0);
  };

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy: sort.sortProperty,
        categoryId: categoryId,
        currentPage: currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchPizzaParams;

      const sort = list.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || list[0],
        })
      );
      isSearch.current = true;

      //костыль ниже | МБ ТРЕБУЕТСЯ FIX | МБ ТРЕБУЕТСЯ FIX | МБ ТРЕБУЕТСЯ FIX | МБ ТРЕБУЕТСЯ FIX | МБ ТРЕБУЕТСЯ FIX | МБ ТРЕБУЕТСЯ FIX | МБ ТРЕБУЕТСЯ FIX | МБ ТРЕБУЕТСЯ FIX |

      if (
        window.location.search === "?sortBy=rating&categoryId=0&currentPage=1"
      ) {
        console.log("Сработал костыль");
        getPizzas();
      }
    }
  }, []);

  //Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
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
        <SortPopup />
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
