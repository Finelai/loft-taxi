import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut, sendCard, getUserToken, getUserCardNumber, getUserCardName, getUserCardCVC, getUserCardExpiryDate } from "modules/user";

export class Profile extends React.Component {
  static propTypes = {
    logOut: PropTypes.func,
    sendCard: PropTypes.func,
    userToken: PropTypes.string,
    userCard: PropTypes.number,
    userCardName: PropTypes.string,
    userCardExpiryDate: PropTypes.string,
    userCardCVC: PropTypes.number
  };

  handleLogoutBtn = () => {
    this.props.logOut();
  };

  handleCardSubmit = (event) => {
    event.preventDefault();

    const cardNumber = event.target.card.value;
    const cardName = event.target.name.value;
    const cardExpiryDate = event.target.date.value;
    const cardCVC = event.target.cvc.value;

    const { sendCard, userToken } = this.props;
    sendCard({ userToken, cardNumber, cardName, cardExpiryDate, cardCVC });
  };

  render() {
    return (
      <div className="profile">
        <h2>Профиль</h2>
        <form onSubmit={this.handleCardSubmit}>
          <p>Ваша карта:</p>
          <input type="text" name="card" value={this.props.userCard ? this.props.userCard : "Номер карты" } />
          <br/>
          <input type="text" name="name" value={this.props.userCardName ? this.props.userCardName : "Имя держателя" } />
          <br/>
          <input type="text" name="date" value={this.props.userCardExpiryDate ? this.props.userCardExpiryDate : "Дата окончания" } />
          <br/>
          <input type="text" name="cvc" value={this.props.userCardCVC ? this.props.userCardCVC : "CVC код" } />
          <br/>
          <input type="submit" value="Сохранить" />
        </form>
        <button style={{ float: "right" }} onClick={this.handleLogoutBtn}>Выйти из профиля</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userToken: getUserToken(state),
  userCard: getUserCardNumber(state),
  userCardName: getUserCardName(state),
  userCardExpiryDate: getUserCardExpiryDate(state),
  userCardCVC: getUserCardCVC(state)
});

export default connect(
  mapStateToProps,
  { logOut, sendCard }
)(Profile);
