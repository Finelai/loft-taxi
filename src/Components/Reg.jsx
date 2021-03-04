import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { userIsLoggedIn, reg } from "modules/user";
import { useForm } from "react-hook-form";

const Reg = (props) => {
  const { register, handleSubmit } = useForm();

  const handleRegSubmit = (data) => {
    const { name, surname, email, password } = data;
    const { reg } = props;
    reg({ name, surname, email, password });
  };

  return (
    <div className="reg">
      {props.isLoggedIn ? (
        <div>
          <p>Вы успешно вошли в систему!</p>
          <Link to="/profile">Перейти в профиль</Link>
        </div>
      ) : (
        <div className="reg__form">
          <h2>Регистрация</h2>
          <form onSubmit={handleSubmit(handleRegSubmit)}>
            <label htmlFor="firstName">
              Имя:
              <input name="firstName" type="text" ref={register} />
            </label>
            <label htmlFor="lastName">
              Фамилия:
              <input name="lastName" type="text" ref={register} />
            </label>
            <label htmlFor="email">
              E-mail:
              <input name="email" type="email" ref={register} />
            </label>
            <label htmlFor="password">
              Пароль:
              <input name="password" type="password" ref={register} />
            </label>
            <input type="submit" value="Зарегистрировать" />
          </form>
          <p>Уже зарегистрированы? <Link to="/login">Войти</Link></p>
        </div>
      )}
    </div>
  );
};

Reg.propTypes = {
  isLoggedIn: PropTypes.bool,
  reg: PropTypes.func
};

const mapStateToProps = state => ({
  isLoggedIn: userIsLoggedIn(state)
});

export default connect(
  mapStateToProps,
  { reg }
)(Reg);
