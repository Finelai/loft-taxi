import { createAction } from "redux-actions";

// объявляем action creators
export const reg = createAction("USER_REG");
export const logIn = createAction("USER_LOG_IN");
export const logOut = createAction("USER_LOG_OUT");
export const auth = createAction("USER_AUTHENTICATE");
export const saveCard = createAction("USER_SAVE_CARD");
export const sendCard = createAction("USER_SEND_CARD");
export const getCard = createAction("USER_GET_CARD");