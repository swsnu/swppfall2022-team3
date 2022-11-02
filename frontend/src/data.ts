import { BaseUser, Gender, Photo, User } from './types';

export const fakePhoto: Photo = {
  key: 1,
  user_key: 1,
  index: 1,
  path: '',
};

export const fakeBaseUser: BaseUser = {
  key: 1,
  email: 'user@snu.ac.kr',
  username: '홍길동',
  gender: Gender.MALE,
  birthday: new Date('1997-06-02'),
  location: '서울',
  university: '서울대학교',
  college: '공과대학',
  major: '컴퓨터공학부',
  reprPhoto: fakePhoto.path,
};

export const fakeUser: User = {
  ...fakeBaseUser,
  introduction: '안녕하세요',
  tags: ['여행', '코딩', '맛집탐방', '헬스'],
  photos: [fakePhoto.path],
}

export const fakeBaseUsers: BaseUser[] = [
  fakeBaseUser,
]

export const fakeUsers: User[] = [
  fakeUser,
]
