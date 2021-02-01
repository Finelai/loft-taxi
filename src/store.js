import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer, { authMiddleware } from "./modules/user";

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducers = combineReducers({authReducer});
const middlewares = applyMiddleware(authMiddleware);

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducers);

const persistedStore = () => {
  let store = createStore(persistedReducer, composeWithDevTools(middlewares));
  let persistor = persistStore(store);

  return { store, persistor }
}

export default persistedStore;