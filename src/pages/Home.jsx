import { useContext, useEffect, useRef } from "react";
import qs from "qs";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";

import { SearchContext } from "../App";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, currentPage, sort } = useSelector(
    (state) => state.filter
  );
  const { items, status, paginationInfo } = useSelector((state) => state.pizza);
  const { searchValue } = useContext(SearchContext);

  // const [items, setItems] = useState([]);

  const onChangeCategory = (id) => {
    dispatch(setCurrentPage(1));
    dispatch(setCategoryId(id));
  };

  const onChangePage = (numer) => {
    dispatch(setCurrentPage(numer));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue && `&name=*${searchValue}`;

    dispatch(
      fetchPizzas({
        sort,
        search,
        category,
        currentPage,
      })
    );

    window, scrollTo(0, 0);
  };

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy: sort.sortProperty,
        category: categoryId,
        page: currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
  useEffect(() => {
    if (window.location.search) {
      console.log("pfikj");
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortBy);
      // const fix = 100;
      // console.log(sort);
      // console.log(params);
      dispatch(
        setFilters({
          ...params,
          // fix,
          sort,
        })
      );
      isSearch.current = true;

      //костыль ниже | МБ ТРЕБУЕТСЯ FIX | МБ ТРЕБУЕТСЯ FIX | МБ ТРЕБУЕТСЯ FIX | МБ ТРЕБУЕТСЯ FIX | МБ ТРЕБУЕТСЯ FIX | МБ ТРЕБУЕТСЯ FIX | МБ ТРЕБУЕТСЯ FIX | МБ ТРЕБУЕТСЯ FIX |
      console.log(window.location.search, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      if (window.location.search === "?sortBy=rating&category=0&page=1") {
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
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
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
        onChangePage={onChangePage}
        currentPage={currentPage}
        {...paginationInfo}
      />
    </div>
  );
}

export default Home;
