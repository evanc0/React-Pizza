import './scss/app.scss';

import Header from './components/Header';
import { useLocation } from 'react-router-dom';

import Home from './pages/Home';

import Cart from './pages/Cart';
import { useState } from 'react';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();
  console.log(location);
  return (
    <div className="wrapper">
      <Header withSearch searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        {location.pathname === '/cart' && <Cart />}
        {location.pathname === '/' && <Home searchValue={searchValue} />}
        {/* {location.pathname == '*' && } */}
      </div>
    </div>
  );
}

export default App;
