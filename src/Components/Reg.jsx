import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { userIsLoggedIn, reg } from "modules/user";

export class Reg extends React.Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    reg: PropTypes.func
  };

  handleRegSubmit = event => {
    event.preventDefault();

    const name = event.target.firstName.value;
    const surname = event.target.lastName.value;
    const email = event.target.lastName.value;
    const password = event.target.lastName.value;

    const { reg } = this.props;
    reg({ name, surname, email, password });
  };

  render() {
    return (
      <div className="reg">
        {this.props.isLoggedIn ? (
          <div>
            <p>Вы успешно вошли в систему!</p>
            <Link to="/profile">Перейти в профиль</Link>
          </div>
        ) : (
          <div className="reg__form">
            <h2>Регистрация</h2>
            <form onSubmit={this.handleRegSubmit}>
              <label htmlFor="firstName">
                Имя:
                <input name="firstName" type="text" />
              </label>
              <label htmlFor="lastName">
                Фамилия:
                <input name="lastName" type="text" />
              </label>
              <label htmlFor="email">
                E-mail:
                <input name="email" type="email" />
              </label>
              <label htmlFor="password">
                Пароль:
                <input name="password" type="password" />
              </label>
              <input type="submit" value="Зарегистрировать" />
            </form>
            <p>Уже зарегистрированы? <Link to="/login">Войти</Link></p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: userIsLoggedIn(state)
});

export default connect(
  mapStateToProps,
  { reg }
)(Reg);
