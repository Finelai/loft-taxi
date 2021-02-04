import React from "react";

import Header from "./Components/Header";
import Login from "./Components/Login";
import Reg from "./Components/Reg";
import Map from "./Components/Map";
import Profile from "./Components/Profile";

import { connect } from "react-redux";
import { userIsLoggedIn } from "./modules/user";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from './PrivateRoute';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <Switch>
            <Route exact path="/login" component={ Login } />
            <Route exact path="/reg" component={ Reg } />
            <PrivateRoute path="/map" component={ Map } />
            <PrivateRoute path="/profile" component={ Profile } />
          </Switch>
        </main>
      </div>
    );
  }
}

const getUserIsLoggedIn = state => ({
  isLoggedIn: userIsLoggedIn(state)
});

export default connect(
  getUserIsLoggedIn
)(App);
