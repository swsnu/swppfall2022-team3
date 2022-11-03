import { University, College, Major, User, SimplifiedUser, Photo, Tag, Gender, Chat, Pitapat } from './types';

const simplifyUser = (user: User): SimplifiedUser => ({
  key: user.key,
  email: user.email,
  username: user.username,
  gender: user.gender,
  birthday: user.birthday,
  location: user.location,
  university: user.university,
  college: user.college,
  major: user.major,
  reprPhoto: user.photos[0],
})


export const universities: University[] = [
  {
    key: 1,
    name: "서울대학교",
    colleges:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  },
  {
    key: 2,
    name: "낙성대학교",
    colleges:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  },
];

export const colleges: College[] = [
  {
    key: 1,
    name: "인문대학",
    majors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  },
  {
    key: 2,
    name: "사회과학대학",
    majors: [17, 18, 19, 20, 21, 22, 23, 24],
  },
  {
    key: 3,
    name: "자연과학대학",
    majors: [25, 26, 27, 28, 29, 30],
  },
  {
    key: 4,
    name: "공학대학",
    majors: [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
  },
  {
    key: 5,
    name: "경영대학",
    majors: [32],
  },
  {
    key: 6,
    name: "간호대학",
    majors: [31],
  },
  {
    key: 7,
    name: "농업생명과학대학",
    majors: [45, 46, 47, 48, 49, 50, 51],
  },
  {
    key: 8,
    name: "미술대학",
    majors: [52, 53, 54, 55, 56],
  },
  {
    key: 9,
    name: "사범대학",
    majors: [57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71],
  },
  {
    key: 10,
    name: "생활과학대학",
    majors: [72, 73, 74],
  },
  {
    key: 11,
    name: "수의과대학",
    majors: [75, 76],
  },
  {
    key: 12,
    name: "약학대학",
    majors: [77, 78],
  },
  {
    key: 13,
    name: "음악대학",
    majors: [79, 80, 81, 82],
  },
  {
    key: 14,
    name: "의과대학",
    majors: [83, 84],
  },
  {
    key: 15,
    name: "자유전공학부",
    majors: [85],
  },
];

export const majors: Major[] = [
  { key: 1, name: "국어국문학과" },
  { key: 2, name: "중어중문학과" },
  { key: 3, name: "영어영문학과" },
  { key: 4, name: "불어불문학과" },
  { key: 5, name: "독어독문학과" },
  { key: 6, name: "노어노문학과" },
  { key: 7, name: "서어서문학과" },
  { key: 8, name: "아시아언어문명학부" },
  { key: 9, name: "언어학과" },
  { key: 10, name: "국사학과" },
  { key: 11, name: "동양사학과" },
  { key: 12, name: "서양사학과" },
  { key: 13, name: "철학과" },
  { key: 14, name: "종교학과" },
  { key: 15, name: "미학과" },
  { key: 16, name: "고고미술사학과" },
  { key: 17, name: "정치외교학부" },
  { key: 18, name: "경제학부" },
  { key: 19, name: "사회학과" },
  { key: 20, name: "인류학과" },
  { key: 21, name: "심리학과" },
  { key: 22, name: "지리학과" },
  { key: 23, name: "사회복지학과" },
  { key: 24, name: "언론정보학과" },
  { key: 25, name: "수리과학부" },
  { key: 26, name: "통계학과" },
  { key: 27, name: "물리천문학부" },
  { key: 28, name: "화학부" },
  { key: 29, name: "생명과학부" },
  { key: 30, name: "지구환경과학부" },
  { key: 31, name: "간호학과" },
  { key: 32, name: "경영학과" },
  { key: 33, name: "건설환경공학부" },
  { key: 34, name: "기계공학부" },
  { key: 35, name: "힝공우주공학과" },
  { key: 36, name: "재료공학부" },
  { key: 37, name: "전기정보공학부" },
  { key: 38, name: "컴퓨터공학부" },
  { key: 39, name: "화학생물공학부" },
  { key: 40, name: "건축학과" },
  { key: 41, name: "산업공학과" },
  { key: 42, name: "에너지자원공학과" },
  { key: 43, name: "원자핵공학과" },
  { key: 44, name: "조선해양공학과" },
  { key: 45, name: "식물생산과학부" },
  { key: 46, name: "산림과학부" },
  { key: 47, name: "응용생물화학부" },
  { key: 48, name: "식품동물생명공학부" },
  { key: 49, name: "바이오시스템소재학부" },
  { key: 50, name: "조경지역시스템공학부" },
  { key: 51, name: "농경제사회학부" },
  { key: 52, name: "동양화과" },
  { key: 53, name: "서양화과" },
  { key: 54, name: "조소과" },
  { key: 55, name: "디자인학부(공예)" },
  { key: 56, name: "디자인학부(디자인)" },
  { key: 57, name: "교육학과" },
  { key: 58, name: "국어교육과" },
  { key: 59, name: "영어교육과" },
  { key: 60, name: "불어교육과" },
  { key: 61, name: "독어교육과" },
  { key: 62, name: "사회교육과" },
  { key: 63, name: "역사교육과" },
  { key: 64, name: "지리교육과" },
  { key: 65, name: "윤리교육과" },
  { key: 66, name: "수학교육과" },
  { key: 67, name: "물리교육과" },
  { key: 68, name: "화학교육과" },
  { key: 69, name: "생물교육과" },
  { key: 70, name: "지구과학교육과" },
  { key: 71, name: "체육교육과" },
  { key: 72, name: "소비자아동학부" },
  { key: 73, name: "식품영양학과" },
  { key: 74, name: "의류학과" },
  { key: 75, name: "수의예과" },
  { key: 76, name: "수의학과" },
  { key: 77, name: "약학과" },
  { key: 78, name: "제약학과" },
  { key: 79, name: "성악과" },
  { key: 80, name: "작곡과" },
  { key: 81, name: "기악과" },
  { key: 82, name: "국악과" },
  { key: 83, name: "의예과" },
  { key: 84, name: "의학과" },
  { key: 85, name: "자유전공학부" },
];


export const tags: Tag[] = [
  { key: 1, name: '여행', type: 'HOBBY'},
  { key: 2, name: '코딩', type: 'SELF_DEV'},
  { key: 3, name: '맛집탐방', type: 'HOBBY'},
  { key: 4, name: '헬스', type: 'SPORT'},
  { key: 5, name: '요리', type: 'HOBBY'},
  { key: 6, name: '컴퓨터게임', type: 'HOBBY'},
  { key: 7, name: '방탈출', type: 'ACTIVITY'},
  { key: 8, name: '야구관람', type: 'ACTIVITY'},
  { key: 9, name: '등산', type: 'ACTIVITY'},
  { key: 10, name: '서핑', type: 'ACTIVITY'},
  { key: 11, name: '축구', type: 'SPORT'},
  { key: 12, name: '농구', type: 'SPORT'},
];

export const photos: Photo[] = [
  {
    key: 1,
    user_key: 1,
    index: 1,
    path: '/logo512.png',
  },
]

export const pitapats: Pitapat[] = [
  { from: 1, to: 3 },
]

export const chats: Chat[] = [

]

export const users: User[] = [
  {
    key: 1,
    email: 'user@snu.ac.kr',
    username: '홍길동',
    gender: Gender.MALE,
    birthday: new Date('1997-06-02'),
    location: '서울',
    university: 1,
    college: 4,
    major: 38,
    introduction: '안녕하세요',
    tags: [1, 2, 3, 4],
    photos: [1, 1, 1],
  },
  {
    key: 2,
    email: 'test@snu.ac.kr',
    username: 'nana99',
    gender: Gender.MALE,
    birthday: new Date('1999-05-02'),
    location: '서울',
    university: 1,
    college: 1,
    major: 9,
    introduction: '안녕하세요 ㅎㅎ 반갑습니다 저는 인문대 다니고 있는 99년생 학생이에요!',
    tags: [1, 2, 5, 6, 7, 11],
    photos: [1],
  },
  {
    key: 3,
    email: 'test2@snu.ac.kr',
    username: 'pretty_good',
    gender: Gender.FEMALE,
    birthday: new Date('2000-03-02'),
    location: '서울',
    university: 1,
    college: 2,
    major: 21,
    introduction: '처음이라 떨리네요 ㅎㅎ 사회대 다니고있는 23살 여자입니다 잘부탁드려요!!',
    tags: [1, 3, 7],
    photos: [1],
  },
];

export const fakePhoto: Photo = photos[0];

export const fakeBaseUsers: SimplifiedUser[] = users.map(simplifyUser);

export const fakeUser: User = users[0];

export const fakeBaseUser: SimplifiedUser = simplifyUser(fakeUser);

export default {
  universities,
  colleges,
  majors,
  users,
  photos,
  tags,
  pitapats,
  chats,
}
