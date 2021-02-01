import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import authReducer, { authMiddleware } from "./modules/user";

export const store = createStore(combineReducers({authReducer}), applyMiddleware(authMiddleware));