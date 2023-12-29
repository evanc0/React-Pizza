import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';

function Home() {
  const { categoryId, sort } = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const [items, setItems] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  // const [sortType, setSortType] = useState({
  //   name: 'популярности (по возрастанию)',
  //   sortProperty: 'rating',
  // });

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  // console.log(ca);

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
      <Pagination onChangePage={(number) => setCurrentPage(number)} {...paginationInfo} />
    </div>
  );
}

export default Home;
