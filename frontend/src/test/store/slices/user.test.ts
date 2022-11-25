import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from "@reduxjs/toolkit";
import axios from "axios";
import { users } from "../../../dummyData";
import userReducer, {
  getGender,
  fetchSignin,
  fetchSignup,
  getUser,
  getUsers,
  getUserTags,
  getUserIntroduction,
  getPitapatReceivers,
  getPitapatSenders,
  SimplifiedRawUser,
  simplifiedRawDataToUser,
  userToRawData,
  fetchSignout,
  UserState,
  getChatParticipants,
  userActions,
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

  it("should get users", async () => {
    // axios.get = jest.fn().mockResolvedValue({ data: { results: [testSimplifiedRawUser] }, status: 200 });
    axios.get = jest.fn().mockResolvedValue({ data: [testSimplifiedRawUser], status: 200 });

    await store.dispatch(getUsers(1));
    expect(store.getState().user.users).toEqual([simplifiedTestUser]);
  });

  it("should not get users", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: null, status: 500 });

    await store.dispatch(getUsers(1));
    expect(store.getState().user.users).toEqual([]);
  });

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

  it("should get user tags", async () => {
    // axios.get = jest.fn().mockResolvedValue({ data: { results: users }, status: 200 });
    axios.get = jest.fn().mockResolvedValue({ data: users, status: 200 });
    await store.dispatch(getUsers(1));

    store.dispatch(userActions.setInterestedUser(testUser));
    axios.get = jest.fn().mockResolvedValue({ data: [1, 2], status: 200 });
    const testUserWithNewTags = { ...testUser, tags: [1, 2] };
    await store.dispatch(getUserTags(1));
    expect(store.getState().user.interestingUser).toEqual(testUserWithNewTags);
  });

  it("should not get user tags", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: null, status: 500 });
    store.dispatch(userActions.setInterestedUser({ ...testUser, tags: [] }));

    await store.dispatch(getUserTags(1));
    expect(store.getState().user.interestingUser?.tags).toEqual([]);
  });

  it("should get user introduction", async () => {
    // axios.get = jest.fn().mockResolvedValue({ data: { results: users }, status: 200 });
    axios.get = jest.fn().mockResolvedValue({ data: users, status: 200 });
    await store.dispatch(getUsers(1));

    store.dispatch(userActions.setInterestedUser(testUser));
    axios.get = jest.fn().mockResolvedValue({ data: { content: "hi" }, status: 200 });
    const testUserWithNewIntroduction = { ...testUser, introduction: "hi" };
    await store.dispatch(getUserIntroduction(1));
    expect(store.getState().user.interestingUser).toEqual(testUserWithNewIntroduction);

  });

  it("should not get user introduction", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: null, status: 500 });
    store.dispatch(userActions.setInterestedUser({ ...testUser, introduction: "" }));

    await store.dispatch(getUserIntroduction(1));
    expect(store.getState().user.interestingUser?.introduction).toEqual("");
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
