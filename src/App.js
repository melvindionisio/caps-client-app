import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Map from "./pages/Map";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/map">
            <Map />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
