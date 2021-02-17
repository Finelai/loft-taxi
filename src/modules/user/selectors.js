export const userIsLoggedIn = (state) => (state.userReducer.isLoggedIn);
export const getUserToken = (state) => (state.userReducer.userToken);
export const getUserCardNumber = (state) => (state.userReducer.cardNumber);
export const getUserCardName = (state) => (state.userReducer.cardName);
export const getUserCardExpiryDate = (state) => (state.userReducer.cardExpiryDate);
export const getUserCardCVC = (state) => (state.userReducer.cardCVC);