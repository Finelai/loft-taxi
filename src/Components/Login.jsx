import React from 'react';

class Login extends React.Component {
  handleLoginSubmit = event => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(`${email} ${password} has been login successful`);
    this.props.onChangePage('map');
  };

  render() {
    return (
      <div className="login">
        <h2>Вход</h2>
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
        <p>Новый пользователь? <button onClick={() => this.props.onChangePage('reg')}>Зарегистрируйтесь</button></p>
      </div>
    );
  }
}

export default Login;
