import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userIsLoggedIn, auth } from "modules/user";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";

import { TextField, FormLabel, Button } from "@material-ui/core";

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
        <Redirect to="/profile" />
      ) : (
        <div className="login__form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel focused>E-mail:</FormLabel>
            <TextField name="email" type="email" inputRef={register} />
            <FormLabel focused>Пароль:</FormLabel>
            <TextField name="password" type="password" inputRef={register} />
            <Button type="submit">Войти</Button>
          </form>
          <p>
            Новый пользователь?
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
