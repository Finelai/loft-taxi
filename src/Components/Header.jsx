import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

class Header extends React.Component {
    navigateTo = (page) => {
        this.props.changePage(page);
    };

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Loft Taxi
                    </Typography>
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
