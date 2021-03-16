import React from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { userIsLoggedIn, reg } from "redux/modules/user";

import { useForm } from "react-hook-form";

import { Grid, Paper, Typography, FormLabel, TextField, Button } from "@material-ui/core";
import styles from "./Reg.module.scss";

const Reg = (props) => {
  const { register, handleSubmit } = useForm();

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
        <Typography variant="h4">Регистрация</Typography>
        <form onSubmit={handleSubmit(onRegSubmit)}>
          <Grid container direction="column">
            <FormLabel focused>Имя:</FormLabel>
            <TextField
              name="firstName"
              type="text"
              inputRef={register}
            />
            <FormLabel focused>Фамилия:</FormLabel>
            <TextField
              name="lastName"
              type="text"
              ref={register}
            />
            <FormLabel focused>E-mail:</FormLabel>
            <TextField
              name="email"
              type="email"
              ref={register}
            />
            <FormLabel focused>Пароль:</FormLabel>
            <TextField
              name="password"
              type="password"
              ref={register}
            />
            <Grid container justify="flex-end">
              <Button type="submit">Зарегистрировать</Button>
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
