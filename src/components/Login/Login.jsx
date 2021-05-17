import React from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";

import { connect } from "react-redux";
import { userIsLoggedIn, auth } from "redux/modules/user";

import { TextField, FormLabel, Button, Paper, Typography, Grid } from "@material-ui/core";
import styles from "./Login.module.scss";

const Login = (props) => {
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    const { authorize } = props;
    authorize({ email, password });
  };

  if (props.isLoggedIn) {
    return <Redirect to="/profile" />;
  }

  return (
    <Grid container className={styles.login} alignContent="center">
      <Paper className={styles.login__paper}>
        <Grid container direction="column" alignContent="space-around" justify="space-around" className={styles.login__content}>
          <Grid item>
            <Typography variant="h4">Вход</Typography>
          </Grid>
          <Grid item className={styles.login__form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container direction="column">
                <FormLabel focused>E-mail:</FormLabel>
                <TextField
                  name="email"
                  type="email"
                  inputRef={register({
                    required: "Введите E-mail",
                    pattern: {
                      value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: "Введите корректный E-mail",
                    }
                  })}
                  className={styles.login__form__input}
                  helperText={errors.email && errors.email.message}
                  error={errors.email}
                />
                <FormLabel focused>Пароль:</FormLabel>
                <TextField
                  name="password"
                  type="password"
                  inputRef={register({
                    required: "Введите пароль"
                  })}
                  className={styles.login__form__input}
                  helperText={errors.password && errors.password.message}
                  error={errors.password}
                />
                <Grid container justify="flex-end" alignItems="flex-end" alignContent="flex-end">
                  <Button type="submit" className={styles.login__form__btn}>Войти</Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item>
            <Typography variant="body2">Новый пользователь? <Link to="/reg">Зарегистрируйтесь</Link></Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
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
