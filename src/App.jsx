import './scss/app.scss';

import Header from './components/Header';
import { useLocation } from 'react-router-dom';

import Home from './pages/Home';

import Cart from './pages/Cart';

function App() {
  const location = useLocation();
  console.log(location);
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        {/* <Route path="/" element={<Home />} /> */}
        {location.pathname === '/cart' && <Cart />}
        {location.pathname === '/' && <Home />}
        {/* {location.pathname == '*' && } */}
      </div>
    </div>
  );
}

export default App;
