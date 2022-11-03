export enum Gender {
  MALE = 'M',
  FEMALE = 'F',
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
  colleges: number[];
}

export interface Tag {
  key: number;
  name: string;
  type: string;
}

export interface Photo {
  key: number;
  user_key: number;
  index: number;
  path: string;
}

interface BaseUser {
  key: number;
  email: string;
  username: string;
  gender: Gender;
  birthday: Date;
  location: string;
  university: number;
  college: number;
  major: number;
}

export interface SimplifiedUser extends BaseUser {
  reprPhoto: number;
}

export interface User extends BaseUser {
  introduction: string;
  tags: number[];
  photos: number[];
}

export function getKoreanAge(birthday: Date): number {
  return (new Date().getFullYear() - birthday.getFullYear() + 1);
}

export enum Page {
  SIGN_UP,
  SIGN_IN,
  SEARCH,
  PROFILE_DETAIL,
  PITAPAT_REQUEST,
  CHAT_LIST,
  CHAT_DETAIL,
  SETTING,
  PROFILE_UPDATE,
}
