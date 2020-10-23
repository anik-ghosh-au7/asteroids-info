import { favorites } from "../config/webURL";
// import Landing from "../components/Landing";
import React from "react";

const FavoritesRoute = [
  {
    path: favorites,
    exact: true,
    isProtected: true,
    component: <>Favorites Page</>,
  },
];

export default FavoritesRoute;
