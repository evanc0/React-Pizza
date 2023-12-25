import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  // `https://6d551e6e4aa49570.mokky.dev/items?${
  //   categoryId > 0 ? `category=${categoryId}` : ''
  // }&sortBy=-${sortType.sortProperty}`

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';

    fetch(`https://6d551e6e4aa49570.mokky.dev/items?${category}&sortBy=${sortType.sortProperty}`)
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  const blankArray = new Array(8).fill(0).map((item, index) => {
    return { id: Date.now() + index };
  });

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
      <div className="content__items">
        {isLoading
          ? blankArray.map((obj) => <Skeleton key={obj.id} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
}

export default Home;
