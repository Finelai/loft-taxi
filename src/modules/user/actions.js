import { createAction } from "redux-actions";

// объявляем action creators
export const logIn = createAction('LOG_IN')
export const logOut = createAction('LOG_OUT')
export const auth = createAction('AUTHENTICATE')