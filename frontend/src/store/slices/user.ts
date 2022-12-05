import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Gender, User } from "../../types";
import { RootState } from "../index";
import { signinUrl, signoutUrl, authUserUrl, userUrl } from "../urls";


export type RawUser = {
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

export type SimplifiedRawUser = {
  key: number;
  nickname: string;
  gender: string;
  birthday: string;
  college: number;
  major: number;
  repr_photo: string;
}

export const getGender = (genderStr: string): Gender => {
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
export const simplifiedRawDataToUser = (simplifiedRawUser: SimplifiedRawUser): User => ({
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
  pitapat: {
    senders: User[];
    receivers: User[];
  };
  chat: {
    participants: User[];
  };
  pitapatListTabIndex: 0 | 1;
}

const savedLoginUser = sessionStorage.getItem("loginUser");

const initialState: UserState = {
  users: [],
  loginUser: savedLoginUser ?
    JSON.parse(savedLoginUser) as User :
    null,
  interestingUser: null,
  pitapat: {
    senders: [],
    receivers: [],
  },
  chat: {
    participants: [],
  },
  pitapatListTabIndex: 0,
};


export const fetchSignin = createAsyncThunk(
  "user/signin",
  async (user: { username: string; password: string }): Promise<User | null> => {
    try {
      // get session token
      await axios.post(signinUrl, user);
      // get user key
      const authResponse = await axios.get(authUserUrl);
      if (authResponse.status !== 200) {
        return null;
      }
      const userKey = authResponse.data.pk as number;
      // get user data
      const userResponse = await axios.get(`${userUrl}/${userKey}`);
      return rawDataToUser(userResponse.data as RawUser);
    } catch (_) {
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
  async (param?: {
    page: number;
    gender: Gender;
    minAge: number;
    maxAge: number;
    includedColleges: number[];
    excludedColleges: number[];
    includedMajors: number[];
    excludedMajors: number[];
    includedTags: number[];
    excludedTags: number[];
  }): Promise<User[] | null> => {
    let paramUrl = "";
    if (param) {
      paramUrl = `page=${param.page}${param.gender !== Gender.ALL ? `&gender=${param.gender}` : ""}`;
      if (param.minAge) {
        paramUrl += `&age_min=${param.minAge}`;
      }
      if (param.maxAge) {
        paramUrl += `&age_max=${param.maxAge}`;
      }
      if (param.includedColleges.length > 0) {
        const lastIndex = param.includedColleges.length - 1;
        paramUrl += "&colleges_included=";
        param.includedColleges.forEach((college, index) => {
          paramUrl += `${college}${index < lastIndex ? "," : ""}`;
        });
      }
      if (param.excludedColleges.length > 0) {
        const lastIndex = param.excludedColleges.length - 1;
        paramUrl += "&colleges_excluded=";
        param.excludedColleges.forEach((college, index) => {
          paramUrl += `${college}${index < lastIndex ? "," : ""}`;
        });
      }
      if (param.includedMajors.length > 0) {
        const lastIndex = param.includedMajors.length - 1;
        paramUrl += "&majors_included=";
        param.includedMajors.forEach((major, index) => {
          paramUrl += `${major}${index < lastIndex ? "," : ""}`;
        });
      }
      if (param.excludedMajors.length > 0) {
        const lastIndex = param.excludedMajors.length - 1;
        paramUrl += "&majors_excluded=";
        param.excludedMajors.forEach((major, index) => {
          paramUrl += `${major}${index < lastIndex - 1 ? "," : ""}`;
        });
      }
      if (param.includedTags.length > 0) {
        const lastIndex = param.includedTags.length - 1;
        paramUrl += "&tags_included=";
        param.includedTags.forEach((tag, index) => {
          paramUrl += `${tag}${index < lastIndex - 1 ? "," : ""}`;
        });
      }
      if (param.excludedTags.length > 0) {
        const lastIndex = param.excludedTags.length - 1;
        paramUrl += "&tags_excluded=";
        param.excludedTags.forEach((tag, index) => {
          paramUrl += `${tag}${index < lastIndex - 1 ? "," : ""}`;
        });
      }
    }
    const response = await axios.get(`${userUrl}/${paramUrl ? `?${paramUrl}` : ""}`);
    if (response.status === 200) {
      // return (response.data.results as SimplifiedRawUser[]).map(simplifiedRawDataToUser);
      return (response.data as SimplifiedRawUser[]).map(simplifiedRawDataToUser);
    }
    else {
      return null;
    }
  }
);

export const getUser = createAsyncThunk(
  "user/get-one",
  async (userKey: number): Promise<User | null> => {
    const response = await axios.get(`${userUrl}/${userKey}/`);
    if (response.status === 200) {
      return rawDataToUser(response.data as RawUser);
    }
    else {
      return null;
    }
  }
);


export const getPitapatSenders = createAsyncThunk(
  "user/pitapat-senders-to-user",
  async (userKey: number): Promise<User[] | null> => {
    const response = await axios.get(`${userUrl}/${userKey}/pitapat/to/`);
    if (response.status === 200) {
      // return (response.data.results as SimplifiedRawUser[]).map(simplifiedRawDataToUser);
      return (response.data as SimplifiedRawUser[]).map(simplifiedRawDataToUser);
    }
    else {
      return null;
    }
  }
);

export const getPitapatReceivers = createAsyncThunk(
  "user/pitapat-receivers-to-user",
  async (userKey: number): Promise<User[] | null> => {
    const response = await axios.get(`${userUrl}/${userKey}/pitapat/from/`);
    if (response.status === 200) {
      // return (response.data.results as SimplifiedRawUser[]).map(simplifiedRawDataToUser);
      return (response.data as SimplifiedRawUser[]).map(simplifiedRawDataToUser);
    }
    else {
      return null;
    }
  }
);

export const getChatParticipants = createAsyncThunk(
  "user/get-all-by-chatroom",
  async (chatroomKey: number): Promise<User[] | null> => {
    const response = await axios.get(`/chatroom/${chatroomKey}${userUrl}`);
    if (response.status === 200) {
      return (response.data as SimplifiedRawUser[]).map(simplifiedRawDataToUser);
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
    setPitapatListTabIndex: (state, action: PayloadAction<0 | 1>) => {
      state.pitapatListTabIndex = action.payload;
    },
    deleteSender: (state, action: PayloadAction<number>) => {
      state.pitapat.senders = state.pitapat.senders.filter((u) => u.key !== action.payload);
    },
    deleteReceiver: (state, action: PayloadAction<number>) => {
      state.pitapat.receivers = state.pitapat.receivers.filter((u) => u.key !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchSignin.fulfilled,
      (state, action) => {
        sessionStorage.setItem("loginUser", JSON.stringify(action.payload));
        state.loginUser = action.payload;
      }
    );
    builder.addCase(
      fetchSignout.fulfilled,
      (state) => {
        sessionStorage.removeItem("loginUser");
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
      getUser.fulfilled,
      (state, action) => {
        if (action.payload) {
          state.interestingUser = action.payload;
        }
      }
    );
    builder.addCase(
      getPitapatSenders.fulfilled,
      (state, action) => {
        if (action.payload) {
          state.pitapat.senders = action.payload;
        }
      }
    );
    builder.addCase(
      getPitapatReceivers.fulfilled,
      (state, action) => {
        if (action.payload) {
          state.pitapat.receivers = action.payload;
        }
      }
    );
    builder.addCase(
      getChatParticipants.fulfilled,
      (state, action) => {
        if (action.payload) {
          state.chat.participants = action.payload;
        }
      }
    );
  },
});

export const userActions = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
const userReducer = userSlice.reducer;
export default userReducer;
