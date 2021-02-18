import { takeEvery, call, put, all } from "redux-saga/effects";
import { saveAdressList, receiveAdressList } from "./actions";
import { serverGetAdressList } from "api";
import { toast } from "react-toastify";

// Get Map Adress List
function* getAdressListSaga() {
  const data = yield call(serverGetAdressList);
  if (data.cardNumber != "") {
    yield put(saveAdressList(data));
    toast("Загружены доступные адреса");
  } else {
    toast.error("Доступные адреса не найдены");
  }
}

function* getAdressListWatcher() {
  yield takeEvery(receiveAdressList, getAdressListSaga);
}


export default function* mapSagas() {
  yield all([ getAdressListWatcher() ]);
}
