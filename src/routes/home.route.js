import { home } from "../config/webURL";
// import Landing from "../components/Landing";
import React from "react";

const HomeRoute = [
  {
    path: home,
    exact: true,
    isProtected: true,
    component: <>Home Page</>,
  },
];

export default HomeRoute;
