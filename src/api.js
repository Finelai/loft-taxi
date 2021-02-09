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

const serverSaveCard = async (cardNumber, token) => {
  return fetch(
    "https://loft-taxi.glitch.me/auth/",
    {
      method: "POST",
      body: JSON.stringify({ cardNumber, token }),
      headers: { "Content-Type": "application/json" }
    }
  ).then(
    res => res.json()
  ).then(
    data => data
  );
};

export { serverLogin, serverSaveCard };