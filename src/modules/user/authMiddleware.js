import { logIn, auth } from "./actions";
import serverLogin from "api";
import { toast } from "react-toastify";

export const authMiddleware = (store) => (next) => async (action) => {
  if (action.type === auth.toString()) {
    const { email, password } = action.payload;
    try {
      const data = await serverLogin(email, password);
      if (data.success) {
        store.dispatch(logIn());
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