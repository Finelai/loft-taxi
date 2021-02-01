import { logIn, auth } from "./actions";
import serverLogin from "api";

export const authMiddleware = (store) => (next) => async (action) => {
  if (action.type === auth.toString()) {
    const { email, password } = action.payload;
    const success = await serverLogin(email, password);
    if (success) {
      store.dispatch(logIn());
    } else {
      next(action);
    }
  } else {
    next(action);
  }
}