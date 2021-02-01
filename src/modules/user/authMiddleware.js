import { logIn, auth } from "./actions";

const serverLogin = async (email, password) => {
  return fetch(
    "https://loft-taxi.glitch.me/auth/",
    {
      method: 'POST',
      body: JSON.stringify({email: email, password: password})
    }
  ).then(
    res => res.json()
  ).then(
    data => data.success
  )
}

export const authMiddleware = (store) => (next) => async (action) => {
  if (action.type === auth.toString()) {
    const { email, password } = action.payload;
    const success = await serverLogin(email, password);
    if (success) {
      store.dispatch(logIn());
    } else {
      next(action);
    }
  }
}