// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'home',
    path: '/dashboard/home',
    icon: icon('ic_home'),
  },
  {
    title: 'stocks',
    path: '/dashboard/stocks',
    icon: icon('ic_analytics'),
  },
  {
    title: 'news',
    path: '/dashboard/news',
    icon: icon('ic_news'),
  },
  {
    title: 'cryptocurrencies',
    path: '/dashboard/coins',
    icon: icon('ic_coin'),
  },
  {
    title: 'about',
    path: '/dashboard/about',
    icon: icon('ic_user'),
  },
];

export default navConfig;
