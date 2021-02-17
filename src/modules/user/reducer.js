import { logIn, logOut, saveCard } from "./actions";

// объявляем стейт по умолчанию (пользователь не залогинен)
const initialState = {
  isLoggedIn: false,
  userToken: "",
  cardNumber: null,
  cardExpiryDate: "",
  cardName: "",
  cardCVC: null
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case logIn.toString(): {
      return {
        isLoggedIn: true,
        userToken: action.payload
      };
    }
    case logOut.toString(): {
      return {
        isLoggedIn: false
      };
    }
    case saveCard.toString(): {
      return {
        cardNumber: action.payload.cardNumber,
        cardExpiryDate: action.payload.expiryDate,
        cardName: action.payload.cardName,
        cardCVC: action.payload.cvc
      };
    }
    default:
      return state;
  }
}

export default userReducer;