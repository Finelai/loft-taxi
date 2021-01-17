import React from 'react';

class Reg extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    console.log(`${firstName} ${lastName} has been register successful`);
  };

  render() {
    return (
      <div className="reg">
        <h2>Регистрация</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Имя:
            <input name="firstName" type="text" />
          </label>
          <label>
            Фамилия:
            <input name="lastName" type="text" />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p>Уже зарегистрированы? Войти</p>
      </div>
    );
  }
}

export default Reg;
