import { takeEvery, call, put, all } from "redux-saga/effects";
import { saveAddressList, receiveAddressList, receiveRoute, saveRoute } from "./actions";
import { serverGetAddressList, serverGetRoute } from "api";
import { toast } from "react-toastify";

// Get Map Address List
function* getAddressListSaga() {
  const data = yield call(serverGetAddressList);
  if (data.addresses !== undefined && data.addresses.length !== 0) {
    yield put(saveAddressList(data.addresses));
    toast("Загружены доступные адреса");
  } else {
    toast.error("Доступные адреса не найдены");
  }
}

function* getAddressListWatcher() {
  yield takeEvery(receiveAddressList, getAddressListSaga);
}

// Get Map Route
function* getRoute(action) {
  const { address1, address2 } = action.payload;
  const data = yield call(serverGetRoute, address1, address2);
  if (data) {
    yield put(saveRoute(data));
    toast("Маршрут найден");
  } else {
    toast.error("Маршрут не найден");
  }
}

function* getRouteWatcher() {
  yield takeEvery(receiveRoute, getRoute);
}

export default function* mapSagas() {
  yield all([ getAddressListWatcher(), getRouteWatcher() ]);
}
