import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit";
import { users } from "../../dummyData";
import { Gender, User } from "../../types";
import userReducer, { userActions } from "./user";


describe("user reducer", () => {
  let store: EnhancedStore<
    { user: { users: User[]; loginUser: User | null } },
    AnyAction,
    [ThunkMiddleware<{ user: { users: User[] } }, AnyAction, undefined>]
    >;

  beforeEach(() => {
    store = configureStore({ reducer: { user: userReducer } });
  });

  it("should have initial state", () => {
    expect(store.getState().user.users).toEqual(users);
  });
});
