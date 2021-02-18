import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { persistedStore, sagaMiddleware } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { userSagas } from "./modules/user";
import { mapSagas } from "./modules/map";
import { all } from "redux-saga/effects";

const { store, persistor } = persistedStore();
function* rootSaga() {
  yield all([ userSagas(), mapSagas() ]);
}

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
