const serverRegister = async (email, password, name, surname) => {
  return fetch(
    "https://loft-taxi.glitch.me/register/",
    {
      method: "POST",
      body: JSON.stringify({ email, password, name, surname }),
      headers: { "Content-Type": "application/json" }
    }
  ).then(
    res => res.json()
  ).then(
    data => data
  );
};

const serverLogin = async (email, password) => {
  return fetch(
    "https://loft-taxi.glitch.me/auth/",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" }
    }
  ).then(
    res => res.json()
  ).then(
    data => data
  );
};

const serverSaveCard = async (cardNumber, userToken) => {
  return fetch(
    "https://loft-taxi.glitch.me/card/",
    {
      method: "POST",
      body: JSON.stringify({ cardNumber: cardNumber, expiryDate: "", cardName: "", cvc: "", token: userToken }),
      headers: { "Content-Type": "application/json" }
    }
  ).then((response) => response.json()
  ).then((response) => response);
};

export { serverLogin, serverSaveCard, serverRegister };