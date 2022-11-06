import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Gender, User} from "../../types";
import dummyData from "../../dummyData";
import axios from "axios";
import { RootState } from "../index";
import {init} from "emailjs-com";


const storeKey = "user";

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

const initialState: UserState = {
  users: getInitialUsers(),
  loginUser: null,
};

export const login = createAsyncThunk(
  "user/",
  async (user: { email: string, password: string }, { dispatch }) => {
    const response = await axios.post(`/api/user/login/`, user);
    if (response.status === 204) {
      dispatch(userActions.login({ email: user.email }));
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
      state.loginUser = state.users.find(user => user.email === action.payload.email) ?? null;
    },
  },
})

export const userActions = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
const userReducer = userSlice.reducer;
export default userReducer;
