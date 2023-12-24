import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundBlockPage from './components/NotFoundBlock/NotFoundBlockPage.jsx';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
    },
    {
      path: '/cart',
      element: <App />,
    },
    {
      path: '*',
      element: <NotFoundBlockPage />,
    },
  ],
  { basename: '/' },
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
