import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { userIsLoggedIn } from "./redux/modules/user";

export const PrivateRoute = connect(() => ({
  isLoggedIn: userIsLoggedIn,
}))(({ component: Component, isLoggedIn,...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
));
