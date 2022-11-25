import { configureStore } from "@reduxjs/toolkit";
import { PreloadedState } from "redux";
import { chatrooms, chats, colleges, majors, tags, universities, users } from "../dummyData";
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
    users: users,
    loginUser: shouldLogin ? users[0] : null,
    interestingUser: shouldLogin ? users[3] : null,
    pitapat: {
      senders: shouldLogin ? [users[1]] : [],
      receivers: shouldLogin ? [users[2]] : [],
    },
    chat: {
      participants: [],
    }
  },
  tag: { tags: tags },
  chat: {
    chatrooms,
    chats: chats,
    chatSockets: [],
  },
});

export const getNoPhotoMockStore = () => getMockStore({
  university: { universities: universities },
  college: { colleges: colleges },
  major: { majors: majors },
  user: {
    users: users,
    loginUser: users[0],
    interestingUser: null,
    pitapat: {
      senders: [],
      receivers: [],
    },
    chat: {
      participants: [],
    }
  },
  tag: { tags: tags },
  chat: {
    chatrooms,
    chats,
    chatSockets: [],
  },
});

export const getNointerestingUserMockStore = () => getMockStore({
  university: { universities: universities },
  college: { colleges: colleges },
  major: { majors: majors },
  user: {
    users: users,
    loginUser: users[0],
    interestingUser: null,
    pitapat: {
      senders: [users[1]],
      receivers: [users[2]],
    },
    chat: {
      participants: [],
    }
  },
  tag: { tags: tags },
  chat: {
    chatrooms,
    chats: chats,
    chatSockets: [],
  },
});
