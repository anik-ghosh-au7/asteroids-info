import React from "react";
import "./App.css";

// components
import Landing from "./components/Landing";

function App() {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <div className="App">
      <header className="wrapper">
        <Landing />
      </header>
    </div>
  );
}

export default App;
