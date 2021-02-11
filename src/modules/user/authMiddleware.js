import { logIn, auth, sendCard, saveCard } from "./actions";
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
  if(action.type === sendCard.toString()) {
    const { cardNumber, userToken } = action.payload;
    try {
      console.log(`до выполнения запроса: ${cardNumber}, ${userToken}`);
      const data = await serverSaveCard(cardNumber, userToken);
      console.log("сразу после выполнения запроса:");
      console.log(data);
      if (data.success) {
        console.log(store.getState());
        store.dispatch(saveCard(cardNumber));
        console.log(store.getState());
        toast("Карта сохранена");
      } else {
        toast.error("Не удалось сохранить карту! Попробуйте в другой раз");
        throw new Error(`ответ сервера: ${data.error}`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Сервис недоступен. Попробуйте в другой раз!");
    }
  } else {
    next(action);
  }
};