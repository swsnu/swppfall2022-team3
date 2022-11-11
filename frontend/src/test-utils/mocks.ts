import { configureStore } from "@reduxjs/toolkit";
import { PreloadedState } from "redux";
import { chats, colleges, majors, photos, pitapats, tags, universities, users } from "../dummyData";
import { RootState } from "../store";
import chatReducer from "../store/slices/chat";
import collegeReducer from "../store/slices/college";
import majorReducer from "../store/slices/major";
import photoReducer from "../store/slices/photo";
import pitapatReducer from "../store/slices/pitapat";
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
      photo: photoReducer,
      tag: tagReducer,
      pitapat: pitapatReducer,
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
  user: { users: users, loginUser: shouldLogin ? users[0] : null },
  photo: { photos: photos },
  tag: { tags: tags },
  pitapat: { pitapats: pitapats },
  chat: { chats: chats },
});

export const getNoPhotoMockStore = () => getMockStore({
  university: { universities: universities },
  college: { colleges: colleges },
  major: { majors: majors },
  user: { users: users, loginUser: users[0] },
  photo: { photos: [{
    key: 1,
    index: 1,
    path: "/photo1.jpeg",
  }] },
  tag: { tags: tags },
  pitapat: { pitapats: pitapats },
  chat: { chats: chats },
});
