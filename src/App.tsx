import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Login } from "./components/login/Login";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/">
            <Login />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
