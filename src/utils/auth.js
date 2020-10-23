import React, { useEffect, useState } from "react";

// utils
import app from "../config/fire";

// components
import Loader from "../components/Loader/Loader";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  // current user state
  const [currentUser, setCurrentUser] = useState(null);

  // pending state
  const [pending, setPending] = useState(true);

  // hook to set user to current user state
  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  // if pending return loading component
  if (pending) {
    return <Loader />;
  }

  // context provider with value = user obj passed to it's children
  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
