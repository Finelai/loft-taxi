import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userIsLoggedIn, auth } from "modules/user";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = (props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    const { authorize } = props;
    authorize({ email, password });
  };

  return (
    <div className="login">
      <h2>Вход</h2>
      {props.isLoggedIn ? (
        <div>
          <p>Вы успешно вошли в систему!</p>
          <Link to="/profile">Перейти в профиль</Link>
        </div>
      ) : (
        <div className="login__form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">
              E-mail:
              <input name="email" type="email" ref={register} />
            </label>
            <label htmlFor="password">
              Пароль:
              <input name="password" type="password" ref={register} />
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
};

Login.propTypes = {
  authorize: PropTypes.func,
  isLoggedIn: PropTypes.bool,
};

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
