import { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Pagination from '../components/Pagination/Pagination';

function Home({ searchValue }) {
  const [items, setItems] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue && `&name=*${searchValue}`;

    fetch(
      `https://6d551e6e4aa49570.mokky.dev/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType.sortProperty}${search}`,
    )
      .then((res) => res.json())
      .then((res) => {
        setItems(res.items);
        setPaginationInfo(res.meta);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);
  console.log(paginationInfo);

  const blankArray = new Array(8).fill(0).map((item, index) => {
    return { id: Date.now() + index };
  });
  const skeletons = blankArray.map((obj) => <Skeleton key={obj.id} />);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(i) => {
            setCategoryId(i);
          }}
        />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} {...paginationInfo} />
    </div>
  );
}

export default Home;
