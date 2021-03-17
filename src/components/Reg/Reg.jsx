import React from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { userIsLoggedIn, reg } from "redux/modules/user";

import { useForm } from "react-hook-form";

import { Grid, Paper, Typography, FormLabel, TextField, Button } from "@material-ui/core";
import styles from "./Reg.module.scss";

const Reg = (props) => {
  const { register, handleSubmit, errors } = useForm();

  const onRegSubmit = (data) => {
    const { email, password } = data;
    const name = data.firstName,
      surname = data.lastName;
    const { reg } = props;
    reg({ name, surname, email, password });
  };

  if (props.isLoggedIn) {
    return <Redirect to="/profile" />;
  }

  return (
    <Grid container className={styles.reg} alignContent="center">
      <Paper className={styles.reg__form}>
        <Typography className={styles.reg__form_title} variant="h4">Регистрация</Typography>
        <form onSubmit={handleSubmit(onRegSubmit)}>
          <Grid container direction="column">
            <FormLabel focused>Имя:</FormLabel>
            <TextField
              className={styles.reg__form__input}
              name="firstName"
              type="text"
              inputRef={register({
                required: "Введите имя"
              })}
              helperText={errors.firstName && errors.firstName.message}
              error={errors.firstName}
            />
            <FormLabel focused>Фамилия:</FormLabel>
            <TextField
              className={styles.reg__form__input}
              name="lastName"
              type="text"
              inputRef={register({
                required: "Введите фамилию"
              })}
              helperText={errors.lastName && errors.lastName.message}
              error={errors.lastName}
            />
            <FormLabel focused>E-mail:</FormLabel>
            <TextField
              className={styles.reg__form__input}
              name="email"
              type="email"
              inputRef={register({
                required: "Введите E-mail",
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Введите корректный E-mail",
                }
              })}
              helperText={errors.email && errors.email.message}
              error={errors.email}
            />
            <FormLabel focused>Пароль:</FormLabel>
            <TextField
              className={styles.reg__form__input}
              name="password"
              type="password"
              inputRef={register({
                required: "Введите password"
              })}
              helperText={errors.password && errors.password.message}
              error={errors.password}
            />
            <Grid container justify="flex-end">
              <Button className={styles.reg__form__btn} type="submit">Зарегистрировать</Button>
            </Grid>
          </Grid>
        </form>
        <Typography variant="body2">Уже зарегистрированы? <Link to="/login">Войти</Link></Typography>
      </Paper>
    </Grid>
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
