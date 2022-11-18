import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Gender, User } from "../../types";
import { RootState } from "../index";


export const signinUrl = "/auth/login/";
export const signoutUrl = "/auth/logout/";
export const authUserUrl = "/auth/user/";
export const userUrl = "/user/";

type RawUser = {
  key: number;
  email: string;
  nickname: string;
  gender: string;
  interested_gender: string;
  birthday: string;
  university: number;
  college: number;
  major: number;
  introduction: string;
  tags: number[];
  photos: number[];
}

const getGender = (genderStr: string): Gender => {
  if (genderStr === "M") {
    return Gender.MALE;
  }
  else if (genderStr === "F") {
    return Gender.FEMALE;
  }
  return Gender.ALL;
};

const rawDataToUser = (rawUser: RawUser): User => (
  {
    key: rawUser.key,
    email: rawUser.email,
    nickname: rawUser.nickname,
    gender: getGender(rawUser.gender),
    interestedGender: getGender(rawUser.interested_gender),
    birthday: rawUser.birthday,
    university: rawUser.university,
    college: rawUser.college,
    major: rawUser.major,
    introduction: rawUser.introduction,
    tags: rawUser.tags,
    photos: rawUser.photos,
  }
);
export const userToRawData = (user: User): RawUser => (
  {
    key: user.key,
    email: user.email,
    nickname: user.nickname,
    gender: user.gender,
    interested_gender: user.interestedGender,
    birthday: user.birthday,
    university: user.university,
    college: user.college,
    major: user.major,
    introduction: user.introduction,
    tags: user.tags,
    photos: user.photos,
  }
);

export interface UserState {
  users: User[];
  loginUser: User | null;
}

const initialState: UserState = {
  users: [],
  loginUser: null,
};


export const fetchSignin = createAsyncThunk(
  "user/signin",
  async (user: { username: string; password: string }): Promise<User | null> => {
    try {
      // get session token
      await axios.post(signinUrl, user);
      // get user key
      const authResponse = await axios.get(authUserUrl);
      const userKey = authResponse.data.pk as number;
      // get user data
      const userResponse = await axios.get(`${userUrl}/${userKey}`);
      return rawDataToUser(userResponse.data as RawUser);
    }
    catch (_) {
      return null;
    }
  }
);

export const fetchSignout = createAsyncThunk(
  "user/signout",
  async (): Promise<void> => {
    await axios.post(signoutUrl);
  }
);

export const fetchSignup = createAsyncThunk(
  "user/signup",
  async (user: User): Promise<User | null> => {
    const response = await axios.post(
      userUrl,
      userToRawData(user),
    );
    if (response.status === 200) {
      return rawDataToUser(response.data as RawUser);
    }
    else {
      return null;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchSignin.fulfilled,
      (state, action) => {
        state.loginUser = action.payload;
      }
    );
    builder.addCase(
      fetchSignout.fulfilled,
      (state) => {
        state.loginUser = null;
      }
    );
  },
});

export const userActions = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
const userReducer = userSlice.reducer;
export default userReducer;
