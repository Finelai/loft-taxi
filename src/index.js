import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { Provider } from "react-redux";
import { all, fork } from "redux-saga/effects";
import { PersistGate } from "redux-persist/integration/react";
import { persistedStore, sagaMiddleware } from "./redux/store";
import { userSagas } from "./redux/modules/user";
import { mapSagas } from "./redux/modules/map";

import "styles/index.scss";
import "react-toastify/dist/ReactToastify.css";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "loft-taxi-mui-theme";

const { store, persistor } = persistedStore();

function* rootSaga() {
  yield all([ fork(userSagas), fork(mapSagas) ]);
}
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MuiThemeProvider theme={theme}>
            <App />
          </MuiThemeProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
