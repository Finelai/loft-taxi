import { loginSaga } from "./sagas";
import { auth } from "./actions";
import { recordSaga } from "utils/recordSaga";
import * as api from "api";

describe("LoginSaga", () => {
  describe("USER_AUTHENTICATE", () => {
    it("authenticates through api", async () => {
      const data = {
        success: true,
        token: "sometoken"
      };

      const serverLoginMock = jest
        .spyOn(api, "serverLogin")
        .mockImplementation(() => data);

      const dispatched = await recordSaga(
        loginSaga,
        auth({email:"testlogin", password: "123123"})
      );

      expect(serverLoginMock).toHaveBeenCalledTimes(1);

      expect(dispatched).toEqual([
        {
          payload: "sometoken",
          type: "USER_LOG_IN"
        },
      ]);
    });
  });
});
