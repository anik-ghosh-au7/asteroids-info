import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../utils/auth";

const PrivateRoute = (props) => {
  const { currentUser } = useContext(AuthContext);
  console.log("from private route ==>> ", currentUser);
  return !!currentUser ? (
    <Route {...props} /> // sending current user in props of all private routes
  ) : (
    <Redirect to={"/"} />
  );
};

export default PrivateRoute;
