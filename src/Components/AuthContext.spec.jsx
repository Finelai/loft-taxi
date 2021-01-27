import React from "react";
import { AuthContext, AuthProvider } from "./AuthContext";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("AuthContext", () => {
  describe("#logIn", () => {
    it("sets 'isLoggedIn' to false", () => {
      let isLoggedIn;
      let logIn;

      render(
        <AuthProvider>
          <AuthContext.Consumer>
            {(value) => {
              isLoggedIn = value.isLoggedIn;
              logIn = value.logIn;
              return null;
            }}
          </AuthContext.Consumer>
        </AuthProvider>
      );

      // проверяем чтобы метод isLoggedIn возвращал false до ввода данных
      expect(isLoggedIn).toBe(false);
      // с помощью act меняем стейт контекста (AuthContext)
      act(() => {
        logIn("test@test.com", "12345");
      });
      // проверяем что теперь после ввода данных isLoggedIn возвращает true
      expect(isLoggedIn).toBe(true);
    });
  });

  describe("#logOut", () => {
    it("sets 'isLoggedIn' to false", () => {
      let isLoggedIn;
      let logOut;
      let logIn;

      render(
        <AuthProvider>
          <AuthContext.Consumer>
            {(value) => {
              logOut = value.logOut;
              logIn = value.logIn;
              isLoggedIn = value.isLoggedIn;
              return null;
            }}
          </AuthContext.Consumer>
        </AuthProvider>
      );

      expect(isLoggedIn).toBe(false);

      act(() => {
        logIn("test@test.com", "12345");
        logOut();
      });

      expect(isLoggedIn).toBe(false);
    });
  });
});
