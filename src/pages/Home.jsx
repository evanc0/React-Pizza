import { useContext, useEffect, useRef, useState } from 'react';
import qs from 'qs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Pagination from '../components/Pagination/Pagination';

import { SearchContext } from '../App';

function Home() {
  const { categoryId, currentPage, sort } = useSelector((state) => state.filter);
  const { searchValue } = useContext(SearchContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const [items, setItems] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCurrentPage(1));
    dispatch(setCategoryId(id));
  };

  const onChangePage = (numer) => {
    dispatch(setCurrentPage(numer));
  };

  const fetchPizzas = () => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue && `&name=*${searchValue}`;

    axios
      .get(
        `https://6d551e6e4aa49570.mokky.dev/items?page=${currentPage}&limit=4&${category}&sortBy=${sort.sortProperty}${search}`,
      )
      .then((res) => {
        setItems(res.data.items);
        setPaginationInfo(res.data.meta);

        setIsLoading(false);
      });
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
      console.log('pfikj');
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
        }),
      );
      isSearch.current = true;

      //костыль ниже | МБ ТРЕБУЕТСЯ FIX | МБ ТРЕБУЕТСЯ FIX | МБ ТРЕБУЕТСЯ FIX | МБ ТРЕБУЕТСЯ FIX | МБ ТРЕБУЕТСЯ FIX | МБ ТРЕБУЕТСЯ FIX | МБ ТРЕБУЕТСЯ FIX | МБ ТРЕБУЕТСЯ FIX |
      console.log(window.location.search, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      if (window.location.search === '?sortBy=rating&category=0&page=1') {
        console.log('Сработал костыль');
        fetchPizzas();
      }
    }
  }, []);

  //Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
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
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={onChangePage} currentPage={currentPage} {...paginationInfo} />
    </div>
  );
}

export default Home;
