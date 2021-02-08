import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import { Logo } from "loft-taxi-mui-theme";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Logo></Logo>
          <Link to="/login">Вход</Link>
          <Link to="/reg">Регистрация</Link>
          <Link to="/map">Карта</Link>
          <Link to="/profile">Профиль</Link>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
