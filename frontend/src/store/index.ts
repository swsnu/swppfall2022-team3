import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./slices/chat";
import collegeReducer from "./slices/college";
import majorReducer from "./slices/major";
import tagReducer from "./slices/tag";
import universityReducer from "./slices/university";
import userReducer from "./slices/user";


export const store = configureStore({
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
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
