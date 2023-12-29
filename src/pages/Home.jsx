import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';

function Home() {
  const { categoryId, currentPage, sort } = useSelector((state) => state.filter);

  const dispatch = useDispatch();

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

  // остался баг, при смене категории, я убрал лишнюю перерисовку,
  // добавив сразу нужный setCurrentPage(1) в функции onChangeCategory,
  // но всё равно цифра 1 не подсвечивается, если была выбрала страница 3,
  // а я сменил категорию

  const { searchValue } = useContext(SearchContext);

  useEffect(() => {
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

    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // useEffect(() => {
  //   dispatch(setCurrentPage(1));
  // }, [categoryId]);

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
      <Pagination onChangePage={onChangePage} {...paginationInfo} />
    </div>
  );
}

export default Home;
