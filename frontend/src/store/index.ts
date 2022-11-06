import { configureStore } from "@reduxjs/toolkit";
import universityReducer from "./slices/university";
import collegeReducer from "./slices/college";
import majorReducer from "./slices/major";
import userReducer from "./slices/user";
import photoReducer from "./slices/photo";
import tagReducer from "./slices/tag";
import chatReducer from "./slices/chat";
import pitapatReducer from "./slices/pitapat";


export const backendUrl = "/";

export const store = configureStore({
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
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
