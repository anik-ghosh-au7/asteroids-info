import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../utils/auth";

const PrivateRoute = (props) => {
  const { currentUser } = useContext(AuthContext);
  return !!currentUser ? <Route {...props} /> : <Redirect to={"/"} />;
};

export default PrivateRoute;
