import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const emailUrl = "/auth/email/";
export const verifyUrl = "/auth/verify/";

type emailInfo = {
  email: string;
  request_time: string;
}

type verificationInfo = {
  email: string;
  request_time: string;
  code: string;
}

export const sendVerificationCode = createAsyncThunk(
  "email/send",
  async (emailInfo: emailInfo) => {
    const response = await axios({
      method: "post",
      url: emailUrl,
      data: emailInfo
    });
    return response;
  }
);

export const checkVerificationCode = createAsyncThunk(
  "email/check",
  async (verificationInfo: verificationInfo) => {
    const response = await axios({
      method: "post",
      url: verifyUrl,
      data: verificationInfo
    });
    return response;
  }
);

