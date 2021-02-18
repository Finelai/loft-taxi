import { saveAdressList } from "./actions";

const initialState = {
  adressList: []
};

function mapReducer(state = initialState, action) {
  switch (action.type) {
    case saveAdressList.toString(): {
      return {
        adressList: action.payload
      };
    }
    default:
      return state;
  }
}

export default mapReducer;