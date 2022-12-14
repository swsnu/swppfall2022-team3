import { Cookies } from "react-cookie";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Gender, User } from "../../types";
import { RootState } from "../index";
import { signinUrl, signoutUrl, authUserUrl, userUrl, chatroomUrl } from "../urls";


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

export interface SearchFilter {
  gender: Gender;
  minAge?: number;
  maxAge?: number;
  includedColleges?: number[];
  excludedColleges?: number[];
  includedMajors?: number[];
  excludedMajors?: number[];
  includedTags?: number[];
  excludedTags?: number[];
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
  loginUser: User | null;
  users: User[];
  searchPageIndex: number;
  nextPageUrl: string | null;
  filter: SearchFilter | null;
  interestingUser: User | null;
  pitapat: {
    senders: User[];
    receivers: User[];
  };
  blocked: User[];
  chat: {
    participants: User[];
  };
  pitapatListTabIndex: 0 | 1;
}

const savedLoginUser = sessionStorage.getItem("loginUser");
const savedFilter = localStorage.getItem("user-filter");

const initialState: UserState = {
  loginUser: savedLoginUser ?
    JSON.parse(savedLoginUser) as User :
    null,
  users: [],
  searchPageIndex: 0,
  nextPageUrl: "",
  filter: savedFilter ?
    JSON.parse(savedFilter) as SearchFilter :
    null,
  interestingUser: null,
  pitapat: {
    senders: [],
    receivers: [],
  },
  blocked: [],
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
      const signInResponse = await axios.post(`${signinUrl}/`, user);
      if (signInResponse.status !== 200) {
        return null;
      }
      const sessionToken = signInResponse.data.key;
      const cookies = new Cookies();
      cookies.set("sessionid", sessionToken, { path: "/" });
      // get user key
      const authResponse = await axios.get(`${authUserUrl}/`);
      if (authResponse.status !== 200) {
        return null;
      }
      const userKey = authResponse.data.pk as number;
      // get user data
      const userResponse = await axios.get(`${userUrl}/${userKey}/`);
      return rawDataToUser(userResponse.data as RawUser);
    } catch (_) {
      return null;
    }
  }
);

export const fetchSignout = createAsyncThunk(
  "user/signout",
  async (): Promise<void> => {
    try {
      await axios.post(`${signoutUrl}/`);
    } catch (_) { /* empty */
    }
  }
);

export const fetchSignup = createAsyncThunk(
  "user/signup",
  async (user: User): Promise<User | null> => {
    const response = await axios.post(
      `${userUrl}/`,
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

export interface PageSearchFilter extends SearchFilter {
  pageIndex: number;
}

export const getUsers = async (filter: PageSearchFilter): Promise<{ users: User[]; pageIndex: number; nextPageUrl: string | null } | null> => {
  let filterParams = "";
  filterParams = `page=${filter.pageIndex}${filter.gender !== Gender.ALL ? `&gender=${filter.gender}` : ""}`;
  if (filter.minAge) {
    filterParams += `&age_min=${filter.minAge}`;
  }
  if (filter.maxAge) {
    filterParams += `&age_max=${filter.maxAge}`;
  }
  if (filter.includedColleges?.length) {
    filterParams += `&colleges_included=${filter.includedColleges.join()}`;
  }
  if (filter.excludedColleges?.length) {
    filterParams += `&colleges_excluded=${filter.excludedColleges.join()}`;
  }
  if (filter.includedMajors?.length) {
    filterParams += `&majors_included=${filter.includedMajors.join()}`;
  }
  if (filter.excludedMajors?.length) {
    filterParams += `&majors_excluded=${filter.excludedMajors.join()}`;
  }
  if (filter.includedTags?.length) {
    filterParams += `&tags_included=${filter.includedTags}`;
  }
  if (filter.excludedTags?.length) {
    filterParams += `&tags_excluded=${filter.excludedTags}`;
  }
  const response = await axios.get(`${userUrl}/${filterParams ? `?${filterParams}` : ""}`);
  try {
    return {
      users: (response.data.results as SimplifiedRawUser[]).map(simplifiedRawDataToUser),
      pageIndex: filter.pageIndex,
      nextPageUrl: response.data.next,
    };
  } catch (_) {
    return null;
  }
};

export const getNewUsers = createAsyncThunk(
  "user/get-all-new",
  getUsers,
);

export const getNextUsers = createAsyncThunk(
  "user/get-all-next",
  getUsers,
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

export const getLoginUser = createAsyncThunk(
  "user/get-login-user",
  async (loginUserKey: number): Promise<User | null> => {
    try {
      const loginUserResponse = await axios.get(`${userUrl}/${loginUserKey}/`);
      return rawDataToUser(loginUserResponse.data as RawUser);
    } catch (_) {
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

export const getBlockedUsers = createAsyncThunk(
  "user/blocked-user",
  async (userKey: number): Promise<User[] | null> => {
    const response = await axios.get(`${userUrl}/${userKey}/block/`);
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
    const response = await axios.get(`${chatroomUrl}/${chatroomKey}/user/`);
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
    setFilter: (state, action: PayloadAction<SearchFilter>) => {
      state.filter = action.payload;
      state.searchPageIndex = 0;
      localStorage.setItem("user-filter", JSON.stringify(action.payload));
    },
    setPitapatListTabIndex: (state, action: PayloadAction<0 | 1>) => {
      state.pitapatListTabIndex = action.payload;
    },
    deleteSender: (state, action: PayloadAction<number>) => {
      state.pitapat.senders = state.pitapat.senders.filter((u) => u.key !== action.payload);
    },
    deleteReceiver: (state, action: PayloadAction<number>) => {
      state.pitapat.receivers = state.pitapat.receivers.filter((u) => u.key !== action.payload);
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      const user = state.users.find((u) => u.key === action.payload);
      if (user) {
        state.users = state.users.filter((u) => u.key !== action.payload);
        state.pitapat.receivers.push(user);
      }
    },
    addUser: (state, action: PayloadAction<number>) => {
      const user = state.pitapat.receivers.find((u) => u.key === action.payload);
      if (user) {
        state.users.unshift(user);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getLoginUser.fulfilled,
      (state, action) => {
        sessionStorage.setItem("loginUser", JSON.stringify(action.payload));
        state.loginUser = action.payload;
      }
    );
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
        sessionStorage.clear();
        localStorage.removeItem("user-filter");
        state.loginUser = null;
        state.filter = null;
        state.users = [];
        state.searchPageIndex = 0;
        state.nextPageUrl = "";
        state.interestingUser = null;
        state.pitapat.senders = [];
        state.pitapat.receivers = [];
        state.blocked = [];
        state.chat.participants = [];
        state.pitapatListTabIndex = 0;
      }
    );
    builder.addCase(
      getNewUsers.fulfilled,
      (state, action) => {
        if (action.payload) {
          state.users = action.payload.users;
          state.searchPageIndex = action.payload.pageIndex;
          state.nextPageUrl = action.payload.nextPageUrl;
        }
      }
    );
    builder.addCase(
      getNextUsers.fulfilled,
      (state, action) => {
        if (action.payload && state.searchPageIndex < action.payload.pageIndex) {
          state.users = state.users.concat(action.payload.users);
          state.searchPageIndex = action.payload.pageIndex;
          state.nextPageUrl = action.payload.nextPageUrl;
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
      getBlockedUsers.fulfilled,
      (state, action) => {
        if (action.payload) {
          state.blocked = action.payload;
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
