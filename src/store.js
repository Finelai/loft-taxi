import { createStore } from "redux";
import authReducer from "./modules/user";

export const store = createStore(authReducer);