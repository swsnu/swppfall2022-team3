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
}

export interface University {
  key: number;
  name: string;
  domain: string;
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

export interface Chatroom {
  key: number;
  name: string;
  imagePath: string;
  chats: Chat[];
}

export interface Chat {
  key: number;
  chatroomKey: number;
  author: number;
  content: string;
  regDt: string;
}

export enum PitapatStatus {
  // eslint-disable-next-line no-unused-vars
  NONE,
  // eslint-disable-next-line no-unused-vars
  FROM_ME,
  // eslint-disable-next-line no-unused-vars
  TO_ME,
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
  photos: string[];
}
