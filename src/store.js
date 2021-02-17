import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "./modules/user";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import createSagaMiddleware from "redux-saga";

const rootReducers = combineReducers({ userReducer });
const sagaMiddleware = createSagaMiddleware();
const middlewares = applyMiddleware(sagaMiddleware);

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const persistedStore = () => {
  let store = createStore(persistedReducer, composeWithDevTools(middlewares));
  let persistor = persistStore(store);

  return { store, persistor };
};

export { persistedStore, sagaMiddleware };