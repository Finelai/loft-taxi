import { takeEvery, call, put } from "redux-saga/effects";
import { auth, logIn } from "./actions";
import { serverLogin } from "api";

export function* authenticateSaga(action) {
  const { email, password } = action.payload;
  const success = yield call(serverLogin, email, password);
  if (success) {
    yield put(logIn());
  }
}

export function* authSaga() {
  yield takeEvery(auth, authenticateSaga);
}
