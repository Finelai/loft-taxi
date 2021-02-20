import { logIn, logOut, saveCard } from "./actions";

// объявляем стейт по умолчанию (пользователь не залогинен)
const initialState = {
  isLoggedIn: false,
  userToken: "",
  card: {
    number: null,
    name: "",
    expiryDate: "",
    cvc: null
  }
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case logIn.toString(): {
      return {
        ...state,
        isLoggedIn: true,
        userToken: action.payload
      };
    }
    case logOut.toString(): {
      return {
        ...state,
        isLoggedIn: false
      };
    }
    case saveCard.toString(): {
      return {
        ...state,
        card: {
          number: action.payload.cardNumber,
          expiryDate: action.payload.expiryDate,
          name: action.payload.cardName,
          cvc: action.payload.cvc
        }
      };
    }
    default:
      return state;
  }
}

export default userReducer;