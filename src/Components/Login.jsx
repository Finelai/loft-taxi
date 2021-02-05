import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userIsLoggedIn, auth } from "modules/user";
import { Link } from 'react-router-dom';

class Login extends React.Component {
  static propTypes = {
    authorize: PropTypes.func,
    isLoggedIn: PropTypes.bool,
  };

  handleLoginSubmit = (event) => {
    event.preventDefault();

    // записываем данные для входа из формы в переменные
    const email = event.target.email.value;
    const password = event.target.password.value;

    const { authorize } = this.props;
    authorize({ email, password });
  };

  render() {
    return (
      <div className="login">
        <h2>Вход</h2>
        {this.props.isLoggedIn ? (
          <div>
            <p>Вы успешно вошли в систему!</p>
            <Link to="/profile">Перейти в профиль</Link>
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
              <Link to="/reg">Зарегистрируйтесь</Link>
            </p>
          </div>
        )}
      </div>
    );
  }
}

const getUserIsLoggedIn = state => ({
  isLoggedIn: userIsLoggedIn(state)
});

const mapDispatchToProps = dispatch => ({
  authorize: payload => dispatch(auth(payload))
});

export default connect(
  getUserIsLoggedIn,
  mapDispatchToProps
)(Login);
