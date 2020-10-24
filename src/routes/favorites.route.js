import { favorites } from "../config/webURL";
import Favorites from "../pages/Favorites/Favorites";

const FavoritesRoute = [
  {
    path: favorites,
    exact: true,
    isProtected: true,
    component: Favorites,
  },
];

export default FavoritesRoute;
