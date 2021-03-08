import React from "react";
import { ToastContainer } from "react-toastify";

import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

import { connect } from "react-redux";
import { userIsLoggedIn } from "./redux/modules/user";

import { Header, Login, Profile, Reg, Map } from "./components";

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
        <ToastContainer position="bottom-right" pauseOnHover />
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
