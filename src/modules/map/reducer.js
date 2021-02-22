import { saveAddressList, saveRoute } from "./actions";

const initialState = {
  addressList: [],
  route: []
};

function mapReducer(state = initialState, action) {
  switch (action.type) {
    case saveAddressList.toString(): {
      return {
        ...state,
        addressList: action.payload
      };
    }
    case saveRoute.toString(): {
      return {
        ...state,
        route: action.payload
      };
    }
    default:
      return {
        ...state,
        state
      };
  }
}

export default mapReducer;