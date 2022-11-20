import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit";
import axios from "axios";
import { users } from "../../dummyData";
import { User } from "../../types";
import userReducer, { fetchSignin, RawUser, SimplifiedRawUser, userToRawData, fetchSignout } from "./user";


const userToSimplifiedRawData = (user: User): SimplifiedRawUser => ({
  key: user.key,
  nickname: user.nickname,
  gender: user.gender,
  birthday: user.birthday,
  college: user.college,
  major: user.major,
  repr_photo: user.photos[0],
});

describe("user reducer", () => {
  const testUser = users[0];
  const testRawUser = userToRawData(testUser);
  const testSimplifiedRawUser = userToSimplifiedRawData(testUser);

  let store: EnhancedStore<
    { user: {
        users: User[];
        loginUser: User | null;
        interestingUser: User | null;
        pitapatSenders: User[];
        pitapatReceivers: User[];
    }; },
    AnyAction,
    [ThunkMiddleware<{ user: { users: User[] } }>]
    >;

  beforeEach(() => {
    store = configureStore({ reducer: { user: userReducer } });
  });

  it("should have initial state", () => {
    expect(store.getState().user.users).toEqual([]);
    expect(store.getState().user.loginUser).toBeNull();
    expect(store.getState().user.interestingUser).toBeNull();
    expect(store.getState().user.pitapatSenders).toEqual([]);
    expect(store.getState().user.pitapatReceivers).toEqual([]);
  });

  it("should sign in with valid input", async () => {
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

  it("should sign out", async () => {
    axios.post = jest.fn().mockResolvedValue({ status: 204 });
    await store.dispatch(fetchSignout());
    expect(store.getState().user.loginUser).toBeNull();
  });

  it("should not sign in with invalid input", async () => {
    axios.post = jest.fn().mockResolvedValue({ status: 200 });
    axios.get = jest.fn().mockResolvedValue(
      {
        status: 500,
        data: {},
      }
    );

    await store.dispatch(fetchSignin({ username: testUser.email, password: "password" }));
    expect(store.getState().user.loginUser).toBeNull();
  });


  it("should sign up with valid input", async () => {
    axios.post = jest.fn().mockResolvedValue({ data: testRawUser, status: 200 });
    axios.get = jest.fn().mockResolvedValue(
      {
        status: 200,
        data: userToRawData(testUser),
      }
    );

    await store.dispatch(fetchSignin({ username: testUser.email, password: "password" }));
    expect(store.getState().user.loginUser).toEqual(testUser);
  });
});
