const serverRegister = async (email, password, name, surname) => {
  // return fetch(
  //   "https://loft-taxi.glitch.me/register/",
  //   {
  //     method: "POST",
  //     body: JSON.stringify({ email, password, name, surname }),
  //     headers: { "Content-Type": "application/json" }
  //   }
  // ).then(
  //   res => res.json()
  // ).then(
  //   data => data
  // );

  console.log(email, password, name, surname);
  return {success: true, token: 12345};
};

const serverLogin = async (email, password) => {
  // return fetch(
  //   "https://loft-taxi.glitch.me/auth/",
  //   {
  //     method: "POST",
  //     body: JSON.stringify({ email, password }),
  //     headers: { "Content-Type": "application/json" }
  //   }
  // ).then(
  //   res => res.json()
  // ).then(
  //   data => data
  // );

  console.log(email, password);
  return {success: true, token: 12345};
};

const serverSaveCard = async (userToken, cardNumber, cardName, cardExpiryDate, cardCVC) => {
  return fetch(
    "https://loft-taxi.glitch.me/card/",
    {
      method: "POST",
      body: JSON.stringify({ cardNumber: cardNumber, expiryDate: cardExpiryDate, cardName: cardName, cvc: cardCVC, token: userToken }),
      headers: { "Content-Type": "application/json" }
    }
  ).then((response) => response.json()
  ).then((response) => response);
};

const serverGetCard = async () => {
  return fetch("https://loft-taxi.glitch.me/card/").then(
    (response) => response.json()
  ).then((response) => response);
};

const serverGetAddressList = async () => {
  // return fetch("https://loft-taxi.glitch.me/addressList/").then(
  //   (response) => response.json()
  // ).then((response) => response);

  return {"addresses":["Пулково (LED)","Эрмитаж","Кинотеатр Аврора","Мариинский театр"]};
};

const serverGetRoute = async (address1, address2) => {
  return fetch(`https://loft-taxi.glitch.me/route?address1=${address1}&address2=${address2}`).then(
    (response) => response.json()
  ).then((response) => response);
};

export { serverLogin, serverSaveCard, serverGetCard, serverRegister, serverGetAddressList, serverGetRoute };