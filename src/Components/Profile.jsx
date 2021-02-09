import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut, saveCard } from "modules/user";

export class Profile extends React.Component {
  static propTypes = {
    logOut: PropTypes.func,
    cardSend: PropTypes.func
  };

  handleLogoutBtn = () => {
    this.props.logOut();
  };

  handleCardSubmit = (event) => {
    event.preventDefault();

    const cardNumber = event.target.card.value;

    const { cardSend } = this.props;
    cardSend({ cardNumber });
  };

  render() {
    return (
      <div className="profile">
        <h2>Профиль</h2>

        <form onSubmit={this.handleCardSubmit}>
          <p>Введите данные карты:</p>
          <input type="number" name="card"></input>
          <input type="submit" value="Сохранить" />
        </form>

        <button style={{ float: "right" }} onClick={this.handleLogoutBtn}>Выйти из профиля</button>
      </div>
    );
  }
}

const cardDispatchToProps = dispatch => ({
  cardSend: payload => dispatch(saveCard(payload))
});

export default connect(
  cardDispatchToProps,
  { logOut }
)(Profile);
