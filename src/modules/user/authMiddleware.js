import { logIn, auth, saveCard } from "./actions";
import { serverLogin, serverSaveCard } from "api";
import { toast } from "react-toastify";

export const authMiddleware = (store) => (next) => async (action) => {
  if (action.type === auth.toString()) {
    const { email, password } = action.payload;
    try {
      const data = await serverLogin(email, password);
      if (data.success && data.token) {
        console.log(data.token);
        store.dispatch(logIn(data.token));
        toast("Вы успешно вошли в систему");
      } else {
        toast.error("Не удалось войти в систему! Попробуйте другой логин/пароль или зарегистрируйтесь");
      }
    } catch (err) {
      console.log(err);
      toast.error("Сервис недоступен. Попробуйте в другой раз!");
    }
  } else {
    next(action);
  }
};

export const saveCardMiddleware = (store) => (next) => async (action) => {
  console.log((store.getState()).userToken);
  if(action.type === saveCard.toString() && (store.getState()).userToken != "") {
    const { cardNumber } = action.payload;
    try {
      const data = await serverSaveCard(cardNumber, (store.getState()).userToken);
      if (data.success) {
        store.dispatch(saveCard(cardNumber));
        toast("Карта сохранена");
      } else {
        toast.error("Не удалось сохранить карту! Попробуйте в другой раз");
      }
    } catch (err) {
      console.log(err);
      toast.error("Сервис недоступен. Попробуйте в другой раз!");
    }
  } else {
    next(action);
  }
};