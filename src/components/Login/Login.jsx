import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userIsLoggedIn, auth } from "modules/user";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";

import { TextField, FormLabel, Button, Paper, Typography, Grid } from "@material-ui/core";
import styles from "./Login.module.scss";

const Login = (props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    const { authorize } = props;
    authorize({ email, password });
  };

  return (
    <div className={styles.login}>
      {props.isLoggedIn ? (
        <Redirect to="/profile" />
      ) : (
        <div>
          <Paper className={styles.login__paper}>
            <Grid container direction="column" alignContent="space-around" justify="space-around" className={styles.login__content}>

              <Grid item>
                <Typography variant="h4">Вход</Typography>
              </Grid>

              <Grid item className={styles.login__form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container direction="column">
                    <FormLabel focused>E-mail:</FormLabel>
                    <TextField name="email" type="email" inputRef={register} className={styles.login__form__input} />
                    <FormLabel focused>Пароль:</FormLabel>
                    <TextField name="password" type="password" inputRef={register} className={styles.login__form__input} />
                    <Grid container justify="flex-end" alignItems="flex-end" alignContent="flex-end">
                      <Button type="submit" className={styles.login__form__btn}>Войти</Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>

              <Grid item>
                <p>
                  Новый пользователь? <Link to="/reg">Зарегистрируйтесь</Link>
                </p>
              </Grid>

            </Grid>
          </Paper>
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