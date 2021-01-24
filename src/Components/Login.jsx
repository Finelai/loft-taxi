import React from "react";
import PropTypes from "prop-types";
import { withAuth } from "./AuthContext";

class Login extends React.Component {
  static propTypes = {
    onChangePage: PropTypes.func,
  };

  handleLoginSubmit = (event) => {
    event.preventDefault();

    // записываем данные для входа из формы в переменные
    const email = event.target.email.value;
    const password = event.target.password.value;

    // передаем через пропс в переменную LogIn контекста AuthContext данные для входа
    this.props.logIn(email, password);
    console.log(`${email} ${password} try to login in`);

    this.props.onChangePage("map");
  };

  render() {
    return (
      <div className="login">
        <h2>Вход</h2>
        {this.props.isLoggedIn ? (
          <div>
            <p>Вы успешно вошли в систему!</p>
            <button onClick={this.props.onChangePage("map")}>
              Перейти в профиль
            </button>
          </div>
        ) : (
          <div className="login__form">
            <form onSubmit={this.handleLoginSubmit}>
              <label htmlFor="email">
                E-mail:
                <input name="email" type="email" />
              </label>
              <label htmlFor="password">
                Пароль:
                <input name="password" type="password" />
              </label>
              <input type="submit" value="Войти" />
            </form>
            <p>
              Новый пользователь?{" "}
              <button onClick={() => this.props.onChangePage("reg")}>
                Зарегистрируйтесь
              </button>
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(Login);
