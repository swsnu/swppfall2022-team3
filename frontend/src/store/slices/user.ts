import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";
import dummyData from "../../dummyData";
import axios from "axios";
import { RootState } from "../index";


const storeKey = "user";
const loginStoreKey = "loginUser";

export interface UserState {
  users: User[];
  loginUser: User | null;
}

const getInitialUsers = (): User[] => {
  let savedValue = localStorage.getItem(storeKey);
  if (savedValue === null) {
    localStorage.setItem(storeKey, JSON.stringify(dummyData.users));
    savedValue = localStorage.getItem(storeKey);
  }
  return (JSON.parse(savedValue!) as any[]).map((user) => ({...user, birthday: new Date(user.birthday)})) as User[];
};

const getLoginUser = (): User | null => {
  const savedValue = localStorage.getItem(loginStoreKey);
  if (savedValue === null) {
    return null;
  }
  return JSON.parse(savedValue) as User;
}

const initialState: UserState = {
  users: getInitialUsers(),
  loginUser: getLoginUser(),
};

const login = createAsyncThunk(
  "user/",
  async (user: { email: string, password: string }, { dispatch }) => {
    const response = await axios.post("/user/login/", user);
    if (response.status === 204) {
      dispatch(userActions.login(user));
      return true;
    }
    else {
      return false;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
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
    login: (state, action: PayloadAction<{ email: string }>) => {
      const users: User[] = JSON.parse(localStorage.getItem(storeKey)!);
      const user = users.filter((u) => u.email === action.payload.email);
      if (user.length > 0) {
        state.loginUser = user[0];
        localStorage.setItem(loginStoreKey, JSON.stringify(user[0]));
      }
    },
  },
})

export const userActions = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
const userReducer = userSlice.reducer;
export default userReducer;
