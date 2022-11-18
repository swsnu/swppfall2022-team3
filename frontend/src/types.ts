export enum Gender {
  // eslint-disable-next-line no-unused-vars
  MALE = "M",
  // eslint-disable-next-line no-unused-vars
  FEMALE = "F",
  // eslint-disable-next-line no-unused-vars
  ALL = "A",
}

export interface Major {
  key: number;
  name: string;
}

export interface College {
  key: number;
  name: string;
  majors: number[];
}

export interface University {
  key: number;
  name: string;
  domain: string;
  colleges: number[];
}

export interface Tag {
  key: number;
  name: string;
  type: string;
}

export interface Photo {
  key: number;
  index: number;
  path: string;
}

export interface Chat {
  key: number;
  from: number;
  to: number;
  content: string;
  regDt: Date;
}

export interface Pitapat {
  from: number;
  to: number;
}

export enum PitapatStatus {
  // eslint-disable-next-line no-unused-vars
  NONE,
  // eslint-disable-next-line no-unused-vars
  SENT,
  // eslint-disable-next-line no-unused-vars
  RECEIVED,
  // eslint-disable-next-line no-unused-vars
  MATCHED,
}

export interface User {
  key: number;
  email: string;
  nickname: string;
  gender: Gender;
  interestedGender: Gender;
  birthday: string;
  university: number;
  college: number;
  major: number;
  introduction: string;
  tags: number[];
  photos: number[];
}
