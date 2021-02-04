import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { userIsLoggedIn } from "./modules/user";

export const PrivateRoute = connect((state) => ({
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
