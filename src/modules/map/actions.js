import { createAction } from "redux-actions";

export const receiveAdressList = createAction("MAP_RECEIVE_ADRESS_LIST");
export const saveAdressList = createAction("MAP_SAVE_ADRESS_LIST");
export const receiveRoute = createAction("MAP_RECEIVE_ROUTE");
export const saveRoute = createAction("MAP_SAVE_ROUTE");