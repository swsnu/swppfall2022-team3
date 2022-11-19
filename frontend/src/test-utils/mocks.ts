import { configureStore } from "@reduxjs/toolkit";
import { PreloadedState } from "redux";
import { chats, colleges, majors, photos, pitapats, tags, universities, users } from "../dummyData";
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
    interestingUser: null,
  },
  tag: { tags: tags },
  chat: { chats: chats },
});

export const getNoPhotoMockStore = () => getMockStore({
  university: { universities: universities },
  college: { colleges: colleges },
  major: { majors: majors },
  user: {
    users: users,
    loginUser: users[0],
    interestingUser: null,
  },
  tag: { tags: tags },
  chat: { chats: chats },
});
