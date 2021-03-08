import React from "react";
import { Link } from "react-router-dom";

import { AppBar, Toolbar, Button, Grid } from "@material-ui/core";
import { Logo } from "loft-taxi-mui-theme";

class Header extends React.Component {
  render() {
    return (
      <AppBar position="static" color="#ffffff">
        <Toolbar>
          <Logo></Logo>
          <Grid container justify="flex-end">
            <Button component={Link} to="/login">Вход</Button>
            <Button component={Link} to="/reg">Регистрация</Button>
            <Button component={Link} to="/map">Карта</Button>
            <Button component={Link} to="/profile">Профиль</Button>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
