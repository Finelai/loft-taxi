import React from 'react';

class Login extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(`${email} ${password} has been login successful`);
    this.setState({ currentPage: 'map' });
  };

  render() {
    return (
      <div className="login">
        <h2>Вход</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="login">
            E-mail:
            <input name="email" type="email" />
          </label>
          <label htmlFor="password">
            Пароль:
            <input name="password" type="password" />
          </label>
          <input type="submit" value="Войти" />
        </form>
        <p>Новый пользователь? Зарегистрируйтесь</p>
      </div>
    );
  }
}

export default Login;
