import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";


interface VerifyState {
  email: string;
  verificationCode: string;
}

const initialState: VerifyState = {
  email: "",
  verificationCode: ""
}

const verificationSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<VerifyState>) => {
      state.email = action.payload.email;
      state.verificationCode = action.payload.verificationCode;
    },
  }
});

export const selectVerification = (state: RootState) => state.verification;
export const verificationAction = verificationSlice.actions;
const verificationReducer = verificationSlice.reducer;
export default verificationReducer;