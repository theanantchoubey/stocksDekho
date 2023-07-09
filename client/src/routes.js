import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import CryptoPage from './pages/Coins/CryptoPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/Stocks/stockAnalytics';
import NewsPage from './pages/NewsPage';
import CoinsPage from './pages/Coins/CoinPage';
import StocksPage from './pages/Stocks/StocksPage';
import HomePage from './pages/Home/HomePage';
import About from './pages/About';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/stock/:paramsSymbol" />, index: true },
        { path: 'stock/:paramsSymbol', element: <DashboardAppPage /> },
        { path: 'coins', element: <CryptoPage /> },
        { path: 'about', element: <About /> },
        { path: 'news', element: <NewsPage /> },
        { path: 'stocks', element: <StocksPage /> },
        { path: 'home', element: <HomePage /> },
        { path: 'coins/:paramsId', element: <CoinsPage /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/dashboard/home" /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '/',
      element: <Navigate to="/dashboard/home" replace />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
