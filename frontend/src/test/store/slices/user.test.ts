import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit";
import axios from "axios";
import { users } from "../../../dummyData";
import userReducer, {
  fetchSignin,
  fetchSignout,
  fetchSignup, getBlockedUsers,
  getChatParticipants,
  getGender, getLoginUser,
  getPitapatReceivers,
  getPitapatSenders,
  getUser,
  SearchFilter,
  simplifiedRawDataToUser,
  SimplifiedRawUser, userActions,
  UserState,
  userToRawData,
} from "../../../store/slices/user";
import { Gender, User } from "../../../types";


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
  const simplifiedTestUser = simplifiedRawDataToUser(userToSimplifiedRawData(testUser));
  const testRawUser = userToRawData(testUser);
  const testSimplifiedRawUser = userToSimplifiedRawData(testUser);
  const searchFilter: SearchFilter = {
    excludedColleges: [],
    includedColleges: [],
    excludedMajors: [],
    includedMajors: [],
    excludedTags: [],
    includedTags: [],
    gender: Gender.ALL,
    maxAge: 10,
    minAge: 30,
  };

  let store: EnhancedStore<
    { user: UserState },
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
    expect(store.getState().user.pitapat.senders).toEqual([]);
    expect(store.getState().user.pitapat.receivers).toEqual([]);
  });

  it("should change state", async () => {
    store.dispatch(userActions.setFilter(searchFilter));
    store.dispatch(userActions.setPitapatListTabIndex(1));
    store.dispatch(userActions.deleteSender(10));
    store.dispatch(userActions.deleteReceiver(11));

    expect(store.getState().user.filter).toEqual(searchFilter);
    expect(store.getState().user.pitapatListTabIndex).toEqual(1);
    expect(store.getState().user.pitapat.senders.map(u => u.key).indexOf(10) < 0).toBeTruthy();
    expect(store.getState().user.pitapat.receivers.map(u => u.key).indexOf(11) < 0).toBeTruthy();

  });

  it("should get login User", async () => {
    axios.get = jest.fn().mockResolvedValue(
      {
        status: 200,
        data: userToRawData(testUser),
      }
    );

    await store.dispatch(getLoginUser(testUser.key));
    expect(store.getState().user.loginUser).toEqual(testUser);
  });

  it("should not get login User", async () => {
    axios.get = jest.fn().mockResolvedValue({ status: 400 });

    await store.dispatch(getLoginUser(testUser.key));
    expect(store.getState().user.loginUser).toEqual(null);
  });

  it("should get login user", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: testRawUser, status: 200 });

    await store.dispatch(getUser(1));
    expect(store.getState().user.interestingUser).toEqual(testUser);
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

  it("should not sign in with error", async () => {
    axios.post = jest.fn().mockResolvedValue(new Error("error"));

    await store.dispatch(fetchSignin({ username: testUser.email, password: "password" }));
    expect(store.getState().user.loginUser).toBeNull();
  });

  it("should sign out", async () => {
    axios.post = jest.fn().mockResolvedValue({ status: 200 });
    await store.dispatch(fetchSignout());
    expect(store.getState().user.loginUser).toBeNull();
  });


  it("should sign up with valid input", async () => {
    axios.post = jest.fn().mockResolvedValue({ data: testRawUser, status: 200 });

    await store.dispatch(fetchSignup(testUser));
    // should not change the state yet.
    // expect(store.getState().user.loginUser).toEqual(testUser);
  });

  it("should not sign up with wrong input", async () => {
    axios.post = jest.fn().mockResolvedValue({ status: 500 });

    await store.dispatch(fetchSignup(testUser));
    expect(store.getState().user.loginUser).toBeNull();
  });

  // it("should get users", async () => {
  //   // axios.get = jest.fn().mockResolvedValue({ data: { results: [testSimplifiedRawUser] }, status: 200 });
  //   axios.get = jest.fn().mockResolvedValue({ data: [testSimplifiedRawUser], status: 200 });

  //   await store.dispatch(getUsers());
  //   expect(store.getState().user.users).toEqual([simplifiedTestUser]);
  // });

  // it("should not get users", async () => {
  //   axios.get = jest.fn().mockResolvedValue({ data: null, status: 500 });

  //   await store.dispatch(getUsers());
  //   expect(store.getState().user.users).toEqual([]);
  // });

  it("should get user", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: testRawUser, status: 200 });

    await store.dispatch(getUser(1));
    expect(store.getState().user.interestingUser).toEqual(testUser);
  });

  it("should not change the state when getting user is failed", async () => {
    axios.get = jest.fn().mockResolvedValue({ status: 500 });

    await store.dispatch(getUser(1));
    expect(store.getState().user.interestingUser).toBeNull();
  });

  it("should get pitapat senders", async () => {
    // axios.get = jest.fn().mockResolvedValue({ data: { results: [testSimplifiedRawUser] }, status: 200 });
    axios.get = jest.fn().mockResolvedValue({ data: [testSimplifiedRawUser], status: 200 });

    await store.dispatch(getPitapatSenders(1));
    expect(store.getState().user.pitapat.senders).toEqual([simplifiedTestUser]);
  });

  it("should not get pitapat senders", async () => {
    axios.get = jest.fn().mockResolvedValue({ status: 500 });

    await store.dispatch(getPitapatSenders(1));
    expect(store.getState().user.pitapat.senders).toEqual([]);
  });

  it("should get pitapat receivers", async () => {
    // axios.get = jest.fn().mockResolvedValue({ data: { results: [testSimplifiedRawUser] }, status: 200 });
    axios.get = jest.fn().mockResolvedValue({ data: [testSimplifiedRawUser], status: 200 });

    await store.dispatch(getPitapatReceivers(1));
    expect(store.getState().user.pitapat.receivers).toEqual([simplifiedTestUser]);
  });

  it("should not get pitapat receivers", async () => {
    axios.get = jest.fn().mockResolvedValue({ status: 500 });

    await store.dispatch(getPitapatReceivers(1));
    expect(store.getState().user.pitapat.receivers).toEqual([]);
  });

  // it("should get blocked users", async () => {
  //   axios.get = jest.fn().mockResolvedValue({ data: [testSimplifiedRawUser], status: 200 });

  //   await store.dispatch(getBlockedUsers(1));
  //   expect(store.getState().user.chat.participants).toEqual([simplifiedTestUser]);
  // });

  it("should not get blocked users when it fails", async () => {
    axios.get = jest.fn().mockResolvedValue({ status: 400 });

    await store.dispatch(getBlockedUsers(1));
    expect(store.getState().user.chat.participants).toEqual([]);
  });

  it("should get chat participants", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: [testSimplifiedRawUser], status: 200 });

    await store.dispatch(getChatParticipants(1));
    expect(store.getState().user.chat.participants).toEqual([simplifiedTestUser]);
  });

  it("should not get chat participants", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: null, status: 500 });

    await store.dispatch(getChatParticipants(1));
    expect(store.getState().user.chat.participants).toEqual([]);
  });

  it("should work getGender method properly", () => {
    const gender = getGender("A");

    expect(gender).toEqual(Gender.ALL);
  });
});
