import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import "./App.css";
import { AuthProvider } from "./utils/auth";
import routes from "../src/routes";
import { PublicRoute, PrivateRoute } from "./components/routeManagments";

// components
import Notification from "./components/Notification/Notification";

function App() {
  return (
    <div className="App">
      <header className="wrapper">
        <AuthProvider>
          <Router>
            <Switch>
              {routes.map((route, idx) => {
                return !!route.isProtected ? (
                  <PrivateRoute {...route} key={idx} />
                ) : (
                  <PublicRoute {...route} key={idx} />
                );
              })}
            </Switch>
            <Notification />
          </Router>
        </AuthProvider>
      </header>
    </div>
  );
}

export default App;
