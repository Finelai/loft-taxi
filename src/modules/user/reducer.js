import { logIn, logOut, saveCard } from "./actions";

// объявляем стейт по умолчанию (пользователь не залогинен)
const initialState = {
  isLoggedIn: false,
  userToken: "",
  cardNumber: null
};

function userReducer(state = initialState, action) {
  console.log(action.type, action.payload);
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
        cardNumber: (action.payload).substr((action.payload).length - 4)
      };
    }
    default:
      return state;
  }
}

export default userReducer;