import { takeEvery, call, put, all } from "redux-saga/effects";
import { saveAdressList, receiveAdressList, receiveRoute, saveRoute } from "./actions";
import { serverGetAdressList, serverGetRoute } from "api";
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

// Get Map Route
function* getRoute(action) {
  const { address1, address2 } = action.payload;
  const data = yield call(serverGetRoute, address1, address2);
  if (data) {
    yield put(saveRoute(data));
    toast("Маршрут построен");
  } else {
    toast.error("Маршрут не найден");
  }
}

function* getRouteWatcher() {
  yield takeEvery(receiveRoute, getRoute);
}

export default function* mapSagas() {
  yield all([ getAdressListWatcher(), getRouteWatcher() ]);
}
