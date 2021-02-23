import { authWatcher } from "./sagas";
import { auth } from "./actions";
import { recordSaga } from "utils/recordSaga";
import * as api from "api";

describe("LoginSaga", () => {
  describe("USER_AUTHENTICATE", () => {
    it("authenticates through api", async () => {
      const data = [{
        success: true,
        token: "sometoken"
      }];

      const serverLoginMock = jest
        .spyOn(api, "serverLogin")
        .mockImplementation(() => Promise.resolve({ data }));

      const dispatched = await recordSaga(
        authWatcher,
        auth({email:"testlogin", password: "123123"})
      );

      console.log(dispatched);

      expect(serverLoginMock).toHaveBeenCalledTimes(1);

      expect(dispatched).toEqual([
        {
          type: "USER_LOG_IN",
        },
      ]);
    });
  });
});
