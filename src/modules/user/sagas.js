import { takeEvery, call, put, all } from "redux-saga/effects";
import { reg, auth, logIn, saveCard, sendCard } from "./actions";
import { serverRegister, serverLogin, serverSaveCard } from "api";
import { toast } from "react-toastify";

// User Registration
function* regSaga(action) {
  const { firstName, lastName, email, password } = action.payload;
  const data = yield call(serverRegister, email, password, firstName, lastName);
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
  const { email, password } = action.payload;
  const data = yield call(serverLogin, email, password);
  if (data.success && data.token) {
    yield put(logIn(data.token));
    toast("Вы успешно вошли в систему");
  } else {
    toast.error("Не удалось войти в систему! Попробуйте другой логин/пароль или зарегистрируйтесь");
  }
}

function* authWatcher() {
  yield takeEvery(auth, loginSaga);
}

// Send User Card
function* sendCardSaga(action) {
  const { cardNumber, userToken } = action.payload;
  const data = yield call(serverSaveCard, cardNumber, userToken);
  if (data.success) {
    yield put(saveCard(cardNumber));
    toast("Карта сохранена");
  } else {
    toast.error("Не удалось сохранить карту! Попробуйте в другой раз");
  }
}

function* sendCardWatcher() {
  yield takeEvery(sendCard, sendCardSaga);
}


export default function* rootSaga() {
  yield all([ regWatcher(), authWatcher(), sendCardWatcher() ]);
}
