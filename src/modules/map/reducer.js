import { saveAdressList, saveRoute } from "./actions";

const initialState = {
  adressList: [],
  route: []
};

function mapReducer(state = initialState, action) {
  switch (action.type) {
    case saveAdressList.toString(): {
      return {
        adressList: action.payload
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