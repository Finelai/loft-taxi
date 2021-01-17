import React from 'react';

class Reg extends React.Component {
  handleRegSubmit = event => {
    event.preventDefault();
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    console.log(`${firstName} ${lastName} has been register successful`);
    this.props.onChangePage('map');
  };

  render() {
    return (
      <div className="reg">
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
          <input type="submit" value="Submit" />
        </form>
        <p>Уже зарегистрированы? <button onClick={() => this.props.onChangePage('login')}>Войти</button></p>
      </div>
    );
  }
}

export default Reg;
