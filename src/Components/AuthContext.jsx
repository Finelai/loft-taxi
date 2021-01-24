import React from "react";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  // задаем state с геттером (isLoggedIn) - проверяем залогинен ли пользователь и сеттером (setIsLoggedIn) - выставляем пользователю статус после успешного логина; по умолчанию задаем булевое значение false для стейта
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // функция проверки почты и пароля
  const logIn = (email, password) => {
    if (email !== "test@test.com" || password !== "12345") {
      return;
    }
    // выставляем с помощью сеттера булевое значение стейта в true в случае успешного логина
    setIsLoggedIn(true);
  };

  const logOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ logIn, logOut, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const withAuth = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <AuthContext.Consumer>
          {(value) => {
            return <WrappedComponent {...value} {...this.props} />;
          }}
        </AuthContext.Consumer>
      );
    }
  };
};
