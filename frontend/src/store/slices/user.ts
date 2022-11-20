import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Gender, User } from "../../types";
import { RootState } from "../index";


export const signinUrl = "/auth/login/";
export const signoutUrl = "/auth/logout/";
export const authUserUrl = "/auth/user/";
export const userUrl = "/user";

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
  photos: string[];
}

type SimplifiedRawUser = {
  key: number;
  nickname: string;
  gender: string;
  birthday: string;
  college: number;
  major: number;
  repr_photo: string;
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
const simplifiedRawDataToUser = (simplifiedRawUser: SimplifiedRawUser): User => ({
  key: simplifiedRawUser.key,
  email: "",
  nickname: simplifiedRawUser.nickname,
  gender: getGender(simplifiedRawUser.gender),
  interestedGender: Gender.ALL,
  birthday: simplifiedRawUser.birthday,
  university: 0,
  college: simplifiedRawUser.college,
  major: simplifiedRawUser.major,
  introduction: "",
  tags: [],
  photos: [simplifiedRawUser.repr_photo],
});
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
  interestingUser: User | null;
}

const initialState: UserState = {
  users: [],
  loginUser: null,
  interestingUser: null,
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

export const getUsers = createAsyncThunk(
  "user/get-all",
  async (): Promise<User[] | null> => {
    const response = await axios.get(userUrl);
    if (response.status === 200) {
      return (response.data as SimplifiedRawUser[]).map(simplifiedRawDataToUser);
    }
    else {
      return null;
    }
  }
);

/**
 * should be called after state.interestedUser is set
 */
export const getUserTags = createAsyncThunk(
  "user/tags",
  async (userKey: number): Promise<number[] | null> => {
    const response = await axios.get(`${userUrl}/${userKey}/tag/`);
    if (response.status === 200) {
      return response.data as number[];
    }
    else {
      return null;
    }
  }
);

/**
 * should be called after state.interestedUser is set
 */
export const getUserIntroduction = createAsyncThunk(
  "user/introduction",
  async (userKey: number): Promise<string | null> => {
    const response = await axios.get(`${userUrl}/${userKey}/introduction/`);
    if (response.status === 200) {
      return response.data as string;
    }
    else {
      return null;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInterestedUser: (state, action: PayloadAction<User>) => {
      state.interestingUser = action.payload;
    }
  },
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
    builder.addCase(
      getUsers.fulfilled,
      (state, action) => {
        if (action.payload) {
          state.users = action.payload;
        }
      }
    );
    builder.addCase(
      getUserTags.fulfilled,
      (state, action) => {
        if (action.payload && state.interestingUser) {
          const newInterestedUser: User = {
            ...state.interestingUser,
            tags: action.payload,
          };
          state.interestingUser = newInterestedUser;
          state.users = state.users.map((user) => user.key === newInterestedUser.key ? newInterestedUser : user);
        }
      }
    );
    builder.addCase(
      getUserIntroduction.fulfilled,
      (state, action) => {
        if (action.payload && state.interestingUser) {
          const newInterestedUser: User = {
            ...state.interestingUser,
            introduction: action.payload,
          };
          state.interestingUser = newInterestedUser;
          state.users = state.users.map((user) => user.key === newInterestedUser.key ? newInterestedUser : user);
        }
      }
    );
  },
});

export const userActions = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
const userReducer = userSlice.reducer;
export default userReducer;
