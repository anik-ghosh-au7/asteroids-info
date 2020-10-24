import { home } from "../config/webURL";
import Home from "../pages/Home/Home";

const HomeRoute = [
  {
    path: home,
    exact: true,
    isProtected: true,
    component: Home,
  },
];

export default HomeRoute;
