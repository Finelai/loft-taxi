import { authMiddleware } from "./authMiddleware";
import { auth } from "./actions";
import { serverLogIn } from "api";

jest.mock("api", () => ({ serverLogIn: jest.fn(() => true) }));

describe("authMiddleware", () => {
  afterAll(jest.clearAllMocks)

  describe("#AUTHENTICATE", () => {
    describe("with correct credentials", () => {
      it("authenticates through api", async () => {
        serverLogIn.mockImplementation(async () => true);
        const dispatch = jest.fn();

        await authMiddleware({ dispatch })()(
          auth("test@test.com", "123123")
        );
        expect(serverLogIn).toBeCalledWith("test@test.com", "123123");
        expect(dispatch).toBeCalledWith({
          type: "LOG_IN",
        });
      });
    });
    describe("with wrong credentials", () => {
      it("authenticates through api", async () => {
        serverLogIn.mockImplementation(() => false);
        const dispatch = jest.fn();

        await authMiddleware({ dispatch })()(
          auth("testlogin", "testpassword")
        );
        expect(dispatch).not.toBeCalled();
      });
    });
  });
});
