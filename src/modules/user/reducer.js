import { logIn, logOut } from "./actions";

// объявляем стейт по умолчанию (пользователь не залогинен)
const initialState = {
  isLoggedIn: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case logIn.toString(): {
      return { isLoggedIn: true }
    }
    case logOut.toString(): {
      return { isLoggedIn: false }
    }
    default:
      return state;
  }
}