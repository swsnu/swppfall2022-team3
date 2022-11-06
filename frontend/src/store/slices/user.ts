import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";
import dummyData from "../../dummyData";
import { RootState } from "../index";


const storeKey = "user";

const getInitialUsers = (): User[] => {
  let savedValue = localStorage.getItem(storeKey);
  if (savedValue === null) {
    localStorage.setItem(storeKey, JSON.stringify(dummyData.users));
    savedValue = localStorage.getItem(storeKey);
  }
  return (JSON.parse(savedValue!) as any[]).map((user) => ({...user, birthday: new Date(user.birthday)})) as User[];
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: getInitialUsers(),
    loginUser: null,
  },
  reducers: {
    add: (state, action: PayloadAction<User>) => {
      const newUsers = [...state.users, action.payload];
      localStorage.setItem(storeKey, JSON.stringify(newUsers));
      state.users = newUsers;
    },
    update: (state, action: PayloadAction<User>) => {
      const newUsers: User[] = [];
      state.users.forEach((user) => {
        if (user.key === action.payload.key) {
          newUsers.push(action.payload)
        }
        else {
          newUsers.push(user)
        }
      })
      localStorage.setItem(storeKey, JSON.stringify(newUsers));
      state.users = newUsers;
    },
  },
})

export const selectUser = (state: RootState) => state.user;
const userReducer = userSlice.reducer;
export default userReducer;
