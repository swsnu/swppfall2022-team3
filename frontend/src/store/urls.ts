const backendUrl = "/api";

export const signinUrl = `${backendUrl}/auth/login/`;
export const signoutUrl = `${backendUrl}/auth/logout/`;
export const authUserUrl = `${backendUrl}/auth/user/`;
export const authEmailUrl = `${backendUrl}/auth/email/`;
export const authVerifyUrl = `${backendUrl}/auth/verify/`;
export const userUrl = `${backendUrl}/user/`;
export const blockUrl = `${backendUrl}/block/`;
export const passwordChange = `${backendUrl}/auth/password/change/`;

export const chatroomUrl = `${backendUrl}/chatroom/`;
export const chatroomSocketUrl = process.env.REACT_APP_SOCKET_URL;

export const universityUrl = `${backendUrl}/university/`;
export const collegeUrl = `${backendUrl}/college/`;
export const majorUrl = `${backendUrl}/major/`;

export const photoUrl = `${backendUrl}/photo/`;

export const tagUrl = `${backendUrl}/tag/`;

export const pitapatUrl = `${backendUrl}/pitapat/`;
