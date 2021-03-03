import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut, sendCard, getCard, getUserToken, getUserCard } from "modules/user";

export class Profile extends React.Component {
  static propTypes = {
    logOut: PropTypes.func,
    sendCard: PropTypes.func,
    getCard: PropTypes.func,
    userToken: PropTypes.string,
    userCard: PropTypes.object
  };

  componentDidMount() {
    // получаем данные карты пользователя с сервера
    if (this.props.userToken) {
      getCard(this.props.userToken);
    }
  }

  handleLogoutBtn = () => {
    this.props.logOut();
  };

  handleCardSubmit = event => {
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
          <input type="text" name="card" placeholder="Номер карты" value={(this.props.userCard && this.props.userCard.number) ? this.props.userCard.number : null } />
          <br/>
          <input type="text" name="name" placeholder="Имя держателя" value={(this.props.userCard && this.props.userCard.name) ? this.props.userCard.name : null } />
          <br/>
          <input type="text" name="date" placeholder="Дата окончания" value={(this.props.userCard && this.props.userCard.expiryDate) ? this.props.userCard.expiryDate : null } />
          <br/>
          <input type="text" name="cvc" placeholder="CVC код" value={(this.props.userCard && this.props.userCard.cvc) ? this.props.userCard.cvc : null } />
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
  userCard: getUserCard(state)
});

export default connect(
  mapStateToProps,
  { logOut, sendCard, getCard }
)(Profile);
