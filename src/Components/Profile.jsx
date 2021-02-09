import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut, sendCard, getUserToken, getUserCardNumber } from "modules/user";

export class Profile extends React.Component {
  static propTypes = {
    logOut: PropTypes.func,
    sendCard: PropTypes.func,
    userToken: PropTypes.string,
    userCard: PropTypes.number,
  };

  handleLogoutBtn = () => {
    this.props.logOut();
  };

  handleCardSubmit = (event) => {
    event.preventDefault();

    const cardNumber = event.target.card.value;

    const { sendCard, userToken } = this.props;
    sendCard({ cardNumber, userToken });
  };

  render() {
    return (
      <div className="profile">
        <h2>Профиль</h2>

        {this.props.userCard ? (
          <div>
            Ваш номер карты: **** **** { this.props.userCard }
          </div>
        ) : (
          <form onSubmit={this.handleCardSubmit}>
            <p>Введите данные карты:</p>
            <input type="number" name="card"></input>
            <input type="submit" value="Сохранить" />
          </form>
        )}

        <button style={{ float: "right" }} onClick={this.handleLogoutBtn}>Выйти из профиля</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userToken: getUserToken(state),
  userCard: getUserCardNumber(state)
});

export default connect(
  mapStateToProps,
  { logOut, sendCard }
)(Profile);
