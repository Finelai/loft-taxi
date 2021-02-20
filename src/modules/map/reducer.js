import { saveAddressList, saveRoute } from "./actions";

const initialState = {
  addressList: [],
  route: []
};

function mapReducer(state = initialState, action) {
  switch (action.type) {
    case saveAddressList.toString(): {
      return {
        addressList: action.payload
      };
    }
    case saveRoute.toString(): {
      return {
        route: action.payload
      };
    }
    default:
      return state;
  }
}

export default mapReducer;