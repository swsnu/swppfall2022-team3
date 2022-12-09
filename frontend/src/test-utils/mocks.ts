import { configureStore } from "@reduxjs/toolkit";
import { PreloadedState } from "redux";
import { chatrooms, colleges, majors, tags, universities, users } from "../dummyData";
import { RootState } from "../store";
import chatReducer from "../store/slices/chat";
import collegeReducer from "../store/slices/college";
import majorReducer from "../store/slices/major";
import tagReducer from "../store/slices/tag";
import universityReducer from "../store/slices/university";
import userReducer from "../store/slices/user";


export const getMockStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: {
      university: universityReducer,
      college: collegeReducer,
      major: majorReducer,
      user: userReducer,
      tag: tagReducer,
      chat: chatReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }),
    preloadedState,
  });
};

export const getDefaultMockStore = (shouldLogin = true) => getMockStore({
  university: { universities: universities },
  college: { colleges: colleges },
  major: { majors: majors },
  user: {
    loginUser: shouldLogin ? users[0] : null,
    users: users,
    filter: null,
    nextPageUrl: null,
    searchPageIndex: 1,
    interestingUser: shouldLogin ? users[3] : null,
    pitapat: {
      senders: shouldLogin ? [users[1]] : [],
      receivers: shouldLogin ? [users[2]] : [],
    },
    blocked: [],
    chat: {
      participants: [],
    },
    pitapatListTabIndex: 0,
  },
  tag: { tags: tags },
  chat: {
    chatrooms,
    chatSockets: [],
  },
});

export const getNoCollegeMajorMockStore = () => getMockStore({
  university: { universities: universities },
  college: { colleges: [] },
  major: { majors: [] },
  user: {
    loginUser: null,
    users: users,
    filter: null,
    nextPageUrl: null,
    searchPageIndex: 1,
    interestingUser: null,
    pitapat: {
      senders: [],
      receivers: [],
    },
    blocked: [],
    chat: {
      participants: [],
    },
    pitapatListTabIndex: 0,
  },
  tag: { tags: tags },
  chat: {
    chatrooms,
    chatSockets: [],
  },
});

export const getNoTagMockStore = () => getMockStore({
  university: { universities: universities },
  college: { colleges: colleges },
  major: { majors: majors },
  user: {
    loginUser: null,
    users: users,
    filter: null,
    nextPageUrl: null,
    searchPageIndex: 1,
    interestingUser: null,
    pitapat: {
      senders: [],
      receivers: [],
    },
    blocked: [],
    chat: {
      participants: [],
    },
    pitapatListTabIndex: 0,
  },
  tag: { tags: [] },
  chat: {
    chatrooms,
    chatSockets: [],
  },
});

export const getNoPhotoMockStore = () => getMockStore({
  university: { universities: universities },
  college: { colleges: colleges },
  major: { majors: majors },
  user: {
    loginUser: users[0],
    users: users,
    filter: null,
    nextPageUrl: null,
    searchPageIndex: 1,
    interestingUser: null,
    pitapat: {
      senders: [],
      receivers: [],
    },
    blocked: [],
    chat: {
      participants: [],
    },
    pitapatListTabIndex: 0,
  },
  tag: { tags: tags },
  chat: {
    chatrooms,
    chatSockets: [],
  },
});

export const getNointerestingUserMockStore = () => getMockStore({
  university: { universities: universities },
  college: { colleges: colleges },
  major: { majors: majors },
  user: {
    loginUser: users[0],
    users: users,
    filter: null,
    nextPageUrl: null,
    searchPageIndex: 1,
    interestingUser: null,
    pitapat: {
      senders: [users[1]],
      receivers: [users[2]],
    },
    blocked: [],
    chat: {
      participants: [],
    },
    pitapatListTabIndex: 1,
  },
  tag: { tags: tags },
  chat: {
    chatrooms,
    chatSockets: [],
  },
});

export const fakeUrl = "ws://localhost:8000/ws/chat";

export const getWebSocketMockStore = (key: number) => getMockStore({
  university: { universities: universities },
  college: { colleges: colleges },
  major: { majors: majors },
  user: {
    loginUser: users[0],
    users: users,
    filter: null,
    nextPageUrl: null,
    searchPageIndex: 1,
    interestingUser: users[3],
    pitapat: {
      senders: [users[1]],
      receivers: [users[2]],
    },
    blocked: [],
    chat: {
      participants: [],
    },
    pitapatListTabIndex: 0,
  },
  tag: { tags: tags },
  chat: {
    chatrooms: chatrooms,
    chatSockets: [new WebSocket(`${fakeUrl}/${key}/`)],
  },
});
