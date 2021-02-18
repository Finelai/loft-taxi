import { takeEvery, call, put, all } from "redux-saga/effects";
import { reg, auth, logIn, saveCard, sendCard, getCard } from "./actions";
import { receiveAdressList } from "modules/map";
import { serverRegister, serverLogin, serverSaveCard, serverGetCard } from "api";
import { toast } from "react-toastify";

// User Registration
function* regSaga(action) {
  const { name, surname, email, password } = action.payload;
  const data = yield call(serverRegister, email, password, name, surname);
  if (data.success && data.token) {
    yield put(logIn(data.token));
    toast("Вы успешно зарегистрировались и вошли в систему");
  } else {
    toast.error(`Не удалось зарегистрироваться! Ошибка: ${data.error}`);
  }
}

function* regWatcher() {
  yield takeEvery(reg, regSaga);
}

// User Login
function* loginSaga(action) {
  // получаем email и пароль из payload
  const { email, password } = action.payload;
  // отправляем запрос на сервер
  const data = yield call(serverLogin, email, password);
  if (data.success && data.token) {
    // если от сервера получили статус успех и токен
    // записываем в стейт что юзер залогинился, сохраняем его токен
    yield put(logIn(data.token));
    toast("Вы успешно вошли в систему");
    // получаем данные карты пользователя и записываем в стейт
    yield put(getCard(data.token));
    // получаем адреса от сервера и записываем в стейт
    yield put(receiveAdressList);
  } else {
    toast.error("Не удалось войти в систему! Попробуйте другой логин/пароль или зарегистрируйтесь");
  }
}

function* authWatcher() {
  yield takeEvery(auth, loginSaga);
}

// Send User Card
function* sendCardSaga(action) {
  const { userToken, cardNumber, cardName, cardExpiryDate, cardCVC } = action.payload;
  const data = yield call(serverSaveCard, userToken, cardNumber, cardName, cardExpiryDate, cardCVC);
  if (data.success) {
    yield put(saveCard({ cardNumber, cardName, expiryDate: cardExpiryDate, cvc: cardCVC }));
    toast("Карта сохранена");
  } else {
    toast.error("Не удалось сохранить карту! Попробуйте в другой раз");
  }
}

function* sendCardWatcher() {
  yield takeEvery(sendCard, sendCardSaga);
}

// Get User Card
function* getCardSaga(action) {
  const { userToken } = action.payload;
  const data = yield call(serverGetCard, userToken);
  if (data.cardNumber != "") {
    yield put(saveCard(data));
    toast("Данные карта получены");
  } else {
    toast.warn("У вас не привязана карта! Перейдите в профиль и введите данные карты");
  }
}

function* getCardWatcher() {
  yield takeEvery(getCard, getCardSaga);
}


export default function* userSagas() {
  yield all([ regWatcher(), authWatcher(), sendCardWatcher(), getCardWatcher() ]);
}
