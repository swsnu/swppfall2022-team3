import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit";
import { Gender, User } from "../../types";
import userReducer, { userActions } from "./user";
import { users } from "../../dummyData";


describe("user reducer", () => {
  let store: EnhancedStore<
    { user: { users: User[], loginUser: User | null } },
    AnyAction,
    [ThunkMiddleware<{ user: { users: User[] } }, AnyAction, undefined>]
    >;

  beforeEach(() => {
    store = configureStore({ reducer: { user: userReducer } });
  })

  it("should have initial state", () => {
    expect(store.getState().user.users).toEqual(users);
  });

  it("should add a user properly", () => {
    const newUser: User = {
      key: 100,
      email: "",
      username: "test_user",
      gender: Gender.MALE,
      targetGender: Gender.ALL,
      birthday: new Date(),
      location: "",
      university: 1,
      college: 1,
      major: 1,
      introduction: "...",
      tags: [1],
      photos: [1],
    }
    store.dispatch(userActions.add(newUser));
    expect(store.getState().user.users).toEqual([...users, newUser]);
  })

  it("should update a user properly", () => {
    const newUserName = "new user name";
    const user: User = {...users[0], username: newUserName };

    store.dispatch(userActions.update(user));
    const userNames = store.getState().user.users.map((u) => u.username);
    expect(userNames.indexOf(newUserName)).toBeGreaterThanOrEqual(0);
  });

  it("should handle sign in and sign out", () => {
    const user = users[0];
    const invalidUser: User = {...user, email: "not-existed-mail"}


    store.dispatch(userActions.login(invalidUser));
    expect(store.getState().user.loginUser).toBeNull();
    store.dispatch(userActions.login(user));
    expect(store.getState().user.loginUser).toEqual(user);
    store.dispatch(userActions.logout());
    expect(store.getState().user.loginUser).toBeNull();
  })
})
