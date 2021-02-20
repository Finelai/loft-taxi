import { createAction } from "redux-actions";

export const receiveAddressList = createAction("MAP_RECEIVE_ADDRESS_LIST");
export const saveAddressList = createAction("MAP_SAVE_ADDRESS_LIST");
export const receiveRoute = createAction("MAP_RECEIVE_ROUTE");
export const saveRoute = createAction("MAP_SAVE_ROUTE");