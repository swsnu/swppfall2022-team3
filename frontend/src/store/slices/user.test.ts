import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit";
import axios from "axios";
import { users } from "../../dummyData";
import { User } from "../../types";
import userReducer, { userToRawData, fetchSignin } from "./user";


describe("user reducer", () => {
  const testUser = users[0];

  let store: EnhancedStore<
    { user: { users: User[]; loginUser: User | null } },
    AnyAction,
    [ThunkMiddleware<{ user: { users: User[] } }>]
    >;

  beforeEach(() => {
    store = configureStore({ reducer: { user: userReducer } });
  });

  it("should have initial state", () => {
    expect(store.getState().user.users).toEqual([]);
    expect(store.getState().user.loginUser).toBeNull();
  });

  it("should sign up with valid input", async () => {
    axios.post = jest.fn().mockResolvedValue({ status: 200 });
    axios.get = jest.fn().mockResolvedValue(
      {
        status: 200,
        data: userToRawData(testUser),
      }
    );

    await store.dispatch(fetchSignin({ username: testUser.email, password: "password" }));
    expect(store.getState().user.loginUser).toEqual(testUser);

  });

  it("should not sign up with invalid input", () => {
    axios.get = jest.fn().mockResolvedValue(
      {
        status: 500,
        data: {},
      }
    );
    expect(store.getState().user.loginUser).toBeNull();
  });

  it("should", () => {
    expect(1).toEqual(1);
  });
});
