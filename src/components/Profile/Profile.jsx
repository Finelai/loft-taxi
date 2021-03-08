import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { useForm } from "react-hook-form";

import { connect } from "react-redux";
import { logOut, sendCard, getCard, getUserToken, getUserCard } from "redux/modules/user";

const Profile = (props) => {
  const handleLogoutBtn = () => {
    props.logOut();
  };

  const { register, handleSubmit } = useForm();

  const onCardSubmit = (data) => {
    console.log(data);
    const cardNumber = data.card,
      cardName = data.cardname,
      cardExpiryDate = data.date,
      cardCVC = data.cvc;
    const { sendCard, userToken } = props;
    sendCard({ userToken, cardNumber, cardName, cardExpiryDate, cardCVC });
  };

  useEffect(() => {
    if (props.userToken) {
      getCard(props.userToken);
    }
  }, []); // пустой массив = `componentDidMount()`

  return (
    <div className="profile">
      <h2>Профиль</h2>
      <form onSubmit={handleSubmit(onCardSubmit)}>
        <p>Ваша карта:</p>
        <input type="text" name="card" placeholder="Номер карты" value={(props.userCard && props.userCard.number) ? props.userCard.number : undefined } ref={register} />
        <br/>
        <input type="text" name="cardname" placeholder="Имя держателя" value={(props.userCard && props.userCard.name) ? props.userCard.name : undefined } ref={register} />
        <br/>
        <input type="text" name="date" placeholder="Дата окончания" value={(props.userCard && props.userCard.expiryDate) ? props.userCard.expiryDate : undefined } ref={register} />
        <br/>
        <input type="text" name="cvc" placeholder="CVC код" value={(props.userCard && props.userCard.cvc) ? props.userCard.cvc : undefined } ref={register} />
        <br/>
        <input type="submit" value="Сохранить" />
      </form>
      <button style={{ float: "right" }} onClick={handleLogoutBtn}>Выйти из профиля</button>
    </div>
  );
};

Profile.propTypes = {
  logOut: PropTypes.func,
  sendCard: PropTypes.func,
  getCard: PropTypes.func,
  userToken: PropTypes.string,
  userCard: PropTypes.object
};

const mapStateToProps = state => ({
  userToken: getUserToken(state),
  userCard: getUserCard(state)
});

export default connect(
  mapStateToProps,
  { logOut, sendCard, getCard }
)(Profile);
