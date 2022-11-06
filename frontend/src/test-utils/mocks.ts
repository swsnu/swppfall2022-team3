import { configureStore } from "@reduxjs/toolkit";
import { PreloadedState } from "redux";
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
