export enum Gender { MALE, FEMALE };

export interface Major {
  key: number;
  name: string;
};

export interface College {
  key: number;
  name: string;
  majors: Major[];
};

export interface University {
  key: number;
  name: string;
  colleges: College[];
};

export interface Tag {
  key: number;
  name: string;
  type: string;
};

export interface Photo {
  key: number;
  user_key: number;
  index: number;
  path: string;
};

export interface BaseUser {
  key: number;
  email: string;
  username: string;
  gender: Gender;
  birthday: Date;
  location: string;
  university: string;
  college: string;
  major: string;
  reprPhoto: string;
};

export interface User extends BaseUser {
  introduction: string;
  tags: string[];
  photos: string[];
};
