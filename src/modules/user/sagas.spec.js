import { loginSaga } from "./sagas";
import { auth } from "./actions";
import { recordSaga } from "utils/recordSaga";

jest.mock("api", () => ({ serverLogIn: jest.fn(() => true) }));

describe("LoginSaga", () => {
  describe("USER_AUTHENTICATE", () => {
    it("authenticates through api", async () => {
      const dispatched = await recordSaga(
        loginSaga,
        auth("testlogin", "testpassword")
      );

      expect(dispatched).toEqual([
        {
          type: "USER_LOG_IN",
        },
      ]);
    });
  });
});
