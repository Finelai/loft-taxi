import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Logo } from 'loft-taxi-mui-theme';

class Header extends React.Component {
    navigateTo = (page) => {
        this.props.changePage(page);
    };

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Logo></Logo>
                    <Button color="inherit" onClick={() => this.navigateTo('login')}>Вход</Button>
                    <Button color="inherit" onClick={() => this.navigateTo('reg')}>Регистрация</Button>
                    <Button color="inherit" onClick={() => this.navigateTo('map')}>Карта</Button>
                    <Button color="inherit" onClick={() => this.navigateTo('profile')}>Профиль</Button>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;
