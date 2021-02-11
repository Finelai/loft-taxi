import userReducer, { initialState } from "./reducer";
import { logIn, logOut } from "./actions";
import { describe, expect, it} from "@jest/globals";

const someAnotherAction = {
  type: null
};

describe("userReducer", () => {
  describe("default state method isLoggedIn", () => {
    // тестируем возврат значения метода isLoggedIn стейта по умолчанию
    it("return false by default", () => {
      expect(userReducer(initialState, someAnotherAction)["isLoggedIn"]).toBe(false);
    });
  });
  describe("state method isLoggedIn true", () => {
    // тестируем успешный логин
    it("return true when login", () => {
      expect(userReducer(initialState, logIn())["isLoggedIn"]).toBe(true);
    });
  });
  describe("state method isLoggedIn false", () => {
    // тестируем логаут
    it("return true when login", () => {
      expect(userReducer(initialState, logOut())["isLoggedIn"]).toBe(false);
    });
  });
});