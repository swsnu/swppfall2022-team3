# Pitapat Campus: Design and Planning

Rev. 1.0, 10/28/2022

## System Architecture

### MVC Design Pattern

*Pipapat Campus* uses the Model-View-Controller design pattern in system architecture. The frontend contains 8 views, the backend has 6 models, and the controller connects the frontend and the backend.

![mvc](mvc.png)

### Model

#### E-R Diagram

Each table represents an entity or a relationship between entities. Entity tables and relationship tables are distinguished by their prefixes: `E_` and `R_`.

A Line between two tables shows their relationship. Its relationship type is denoted as arrow shape and line color; these symbols are explained below the figure.

![erd](erd.png)

#### Entity Description

| Model            | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| **University**   | A closed community that only users in the same university can see each other. |
| **College**      | Each university has a number of colleges.                    |
| **Major**        | Each college in a university has a number of majors. Used as a user's tag. |
| **User**         | The user that belongs to a university. Has its own introduction, photos, and tags. Can see profiles of other users and send pitapats to them. |
| **Introduction** | Self-introduce text written by a user.                       |
| **Photo**        | Photos showing a user's appearance.                          |
| **Tag**          | Additional keywords that a user adds to appeal itself.       |
| **Pitapat**      | A request for matching from a user to another user.          |

### View

The image below is the user interface for view design.

#### UI Flow

![ui-flow](ui-flow.jpeg)

The functionality and the requirement for each page are described below.

#### Sign In Page (`/signin/`)

- Get 'e-mail' and 'password' and check whether the user is a member. After logging in, navigate to the main page.
- First visitors should click the sign-up button and make an account. Should navigate to the sign-up page.

#### Sign Up Page (`/signup/`)

- Get university information and e-mail address.
- Certify the user's university by receiving the code which is sent to the e-mail address.
- Get a username and check whether it already exists.
- Get information about birth date and year.
- Get information about the major, sex, and sexual orientation.
- Select tags that represent the user.
- Write a self-introduction.
- Upload pictures of the user.

#### Search Page (`/search/`)

- Show the list of users.
- Pictures and the username of each user are shown.
- If a user clicks a picture, navigate to the user-detail page.

#### User Detail Page (`/profile/:id/`)

- Information about the user is shown.
- A user can click a ‘pitapat’ button to send a ‘pitapat’.
- If navigated from the ‘pitapats received list’, there is a ‘Nah’ button for refusing.
- If navigated from the ‘pitapats sent list’, a ‘pitapat’ button is already toggled and it can be canceled.

#### Chat List Page (`/chat/`)

- Show the list of chatting.
- Chatting rooms are sorted by recently updated order.
- Badges represent unseen massages numbers.
- If a user clicks a chatting room, navigate to the chat-detail page.

#### Chat Detail Page (`/chat/:id/`)

- This is similar to Kakao Talk chatting room implementation.

#### Pitapat List Page (`/pitapat/`)

- There are ‘pitapats received list’ and ‘pitapats sent list’ tabs.
- On the ‘pitapats received list’, a user can see other users who sent pitapats to the user.
- On the ‘pitapats sent list’, a user can see other users to whom the user sent pitapats.
- If a user clicks a picture, navigate to the user detail page.

#### Setting Page (`/setting/`)

- A user can navigate to this page, from the search page, the chat list page, and the pitapats list page by clicking a setting button located at the top right corner.
- A user can fix the settings of this service.
- If a user clicks his/her profile picture at the top of the page, a user can fix his/her profile.

### Controller

![controller](controller.png)

## Design Details

### Frontend Design

#### Pages

![front-pages](front-pages.png)

#### Components

![front-components](front-components.png)

### Backend Design

#### API

| Model                   | API                             | GET                                | POST                                   | PUT                        | DELETE                   |
| ----------------------- | ------------------------------- | ---------------------------------- | -------------------------------------- | -------------------------- | ------------------------ |
| -                       | `/auth/`                        | X                                  | check email authentication code        | X                          | X                        |
| **User / Introduction** | `/user/`                        | get user list                      | create new user                        | X                          | X                        |
|                         | `/user/login/`                  | X                                  | log in                                 | X                          | X                        |
|                         | `/user/logout/`                 | X                                  | log out                                | X                          | X                        |
|                         | `/user/<id:int>/`               | get specified user                 | X                                      | edit specified user's info | delete specified user    |
| **University**          | `/univ/`                        | get university list                | X                                      | X                          | X                        |
|                         | `/univ/<id:int>`                | get specified university           | X                                      | X                          | X                        |
| **Photo**               | `/photo/`                       | X                                  | create new photo                       | X                          | X                        |
|                         | `/photo/<id:int>/`              | get specified photo                | X                                      | X                          | delete specified photo   |
| **Tag**                 | `/tag/`                         | get tag list                       | create new tag                         | X                          | X                        |
| **Pitapat**             | `/pitapat/from/<userid:int>`    | X                                  | create new pitapat from specified user | X                          | X                        |
|                         | `/pitapat/to/<userid:int>/`     | get pitapat list to specified user | X                                      | X                          | X                        |
|                         | `/pitapat/<from:int>/<to:int>/` | X                                  | accept specified pitapat               | X                          | delete specified pitapat |
| **Chat**                | `/chat/<userid:int>/`           | get chat list of specified user    |                                        |                            |                          |

#### HTTP Data Format

##### `/auth/send/` [POST]

###### Request

```json
{
    "email": "email@snu.ac.kr"
}
```

###### Response: Success

- status: `204`

```json
{}
```

###### Response: Failed (Duplicated Email)

- status: `409`

```json
{}
```

##### `/auth/verify/` [POST]

###### Request

```json
{
    "code": "123456"
}
```

###### Response: Success

- status: `204`

```json
{}
```

###### Response: Failed (Wrong Verification Code)

- status: `401`

```json
{}
```

##### `/user/` [GET]

###### Request

```json
{
    "genders": ["M"],
    "age_min": 22,
    "age_max": 26,
    "colleges_included": [
        "공과대학",
        "자연과학대학"
    ],
    "colleges_excluded": [],
    "majors_included": [
        "국어국문학과"
    ],
    "majors_excluded": [
        "컴퓨터공학부",
        "전기정보공학부"
    ],
    "tags_included": [
        "헬스",
        "맛집탐방"
    ],
    "tags_excluded": [
        "음악"
    ]
}
```

###### Response

- status: `200`

```json
[
    {
        "id": 1,
        "username": "닉네임1",
        "gender": "M",
        "photo_path": "PATH1",
        "age": 25,
        "major": "기계공학부"
    },
    {
        "id": 2,
        "username": "닉네임2",
        "gender": "M",
        "photo_path": "PATH2",
        "age": 22,
        "major": "생명과학부"
    }
]
```

##### `/user/` [POST]

###### Request

```json
{
    "email": "email@snu.ac.kr",
    "password": "password",
    "username": "닉네임3",
    "gender": "M",
    "age": 24,
    "university": "서울대학교",
    "college": "공과대학",
    "major": "컴퓨터공학부",
    "location": "서울",
    "introduction": "안녕하세요, 홍길동입니다.",
    "tags": [
        "헬스",
        "음악",
        "여행"
    ]
}
```

###### Response

- status: `201`

```json
{}
```

##### `/user/login/` [POST]

###### Request

```json
{
    "email": "email@snu.ac.kr",
    "password": "password"
}
```

###### Response: Success

- status: `204`

```json
{}
```

###### Response: Failed (Wrong Email or Password)

- status: `401`

```json
{}
```

##### `/user/logout/` [POST]

###### Request

```json
{}
```

###### Response

- status: `204`

```json
{}
```

##### `/user/<id:int>/ ` [GET]

###### Request

```json
{}
```

###### Response: Success

- status: `200`

```json
{
    "id": 1,
    "email": "email@snu.ac.kr",
    "password": "password",
    "username": "닉네임3",
    "gender": "M",
    "age": 24,
    "university": "서울대학교",
    "college": "공과대학",
    "major": "컴퓨터공학부",
    "location": "서울",
    "introduction": "안녕하세요, 홍길동입니다.",
    "tags": [
        "헬스",
        "음악",
        "여행"
    ],
    "photos": [
        "PATH1",
        "PATH2"
    ]
}
```

###### Response: Failed (Invalid ID Parameter)

- status: `404`

```json
{}
```

##### `/user/<id:int>/ ` [PUT]

###### Request

```json
{
    "password": "password2",
    "username": "닉네임4",
    "college": "경영대학",
    "major": "경영학부",
    "location": "수원",
    "introduction": "안녕하세요 홍길동입니다",
    "tags": [
        "헬스",
        "맛집탐방",
        "여행"
    ]
}
```

###### Response: Success

- status: `200`

```json
{
    "id": 1,
    "email": "email@snu.ac.kr",
    "password": "password2",
    "username": "닉네임4",
    "gender": "M",
    "age": 24,
    "university": "서울대학교",
    "college": "경영대학",
    "major": "경영학부",
    "location": "수원",
    "introduction": "안녕하세요 홍길동입니다",
    "tags": [
        "헬스",
        "맛집탐방",
        "여행"
    ],
    "photos": [
        "PATH1",
        "PATH2"
    ]
}
```

###### Response: Failed (Invalid ID Parameter)

- status: `404`

```json
{}
```

###### Response: Failed (Invalid Request Body)

- status: `400`

```json
{}
```

##### `/user/<id:int>/  `[DELETE]

###### Request

```json
{}
```

###### Response: Success

- status: `204`

```json
{}
```

###### Response: Failed (Invalid ID Parameter)

- status: `404`

```json
{}
```

#####  `/univ/ ` [GET]

###### Request

```json
{}
```

###### Response

- status: `200`

```json
[
    {
        "id": 1,
        "name": "서울대학교"
    },
    {
        "id": 2,
        "name": "연세대학교"
    },
    {
        "id": 3,
        "name": "고려대학교"
    }
]
```

##### `/univ/<id:int>/ ` [GET]

###### Request

```json
{}
```

###### Response: Success

- status: `200`

```json
{
    "id": 1,
    "name": "서울대학교",
    "colleges": [
        {
            "name": "인문대학",
            "majors": [
                "국어국문학과",
                "영어영문학과",
                "국사학과"
            ],
        },
        {
            "name": "자연과학대학",
            "majors": [
                "수리과학부",
                "화학부"
            ]
        }
    ]
}
```

###### Response: Failed (Invalid ID Parameter)

- status: `404`

```json
{}
```

##### `/photo/ ` [POST]

###### Request

```json
[
    {
        "user_id": 1,
        "index": 1,
        "image": "FILE1"
    },
    {
        "user_id": 1,
        "index": 2,
        "image": "FILE2"
    },
]
```

###### Response

- status: `201`

```json
[
    {
        "id": 10,
        "user_id": 1,
        "index": 1,
        "path": "PATH1"
    },
    {
        "id": 11,
        "user_id": 1,
        "index": 2,
        "path": "PATH2"
    }
]
```

##### `/photo/<id:int>/` [GET]

###### Request

```json
{}
```

###### Response: Success

- status: `200`

```json
{
    "id": 10,
    "user_id": 1,
    "index": 1,
    "path": "PATH1"
}
```

###### Response: Failed (Invalid ID Parameter)

- status: `404`

```json
{}
```

##### `/photo/<id:int>/` [DELETE]

###### Request

```json
{}
```

###### Response: Success

- status: `204`

```json
{}
```

###### Response: Failed (Invalid ID Parameter)

- status: `404`

```json
{}
```

##### `/tag/` [GET]

###### Request

```json
{}
```

###### Response

- status: `200`

```json
[
    "영화",
    "음악",
    "헬스",
    "여행"
]
```

##### `/tag/` [POST]

###### Request

```json
{
    "name": "맛집탐방"
}
```

###### Response: Success

- status: `201`

```json
{}
```

###### Response: Failed (Duplicated Tag Name)

- status: `409`

```json
{}
```

##### `/pitapat/from/<userid:int>/` [POST]

###### Request

```json
{
    "user_to": 3
}
```

###### Response: Success

- status: `201`

```json
{}
```

###### Response: Failed (Duplicated Pitapat Request)

- status: `409`

```json
{}
```

###### Response: Failed (Invalid ID Parameter)

- status: `404`

```json
{}
```

##### `/pitapat/to/<userid:int>/` [GET]

###### Request

```json
{}
```

###### Response: Success

- status: `200`

```json
[
    {
        "id": 1,
        "username": "닉네임1",
        "gender": "M",
        "photo_path": "PATH1",
        "age": 25,
        "major": "기계공학부"
    },
    {
        "id": 2,
        "username": "닉네임2",
        "gender": "M",
        "photo_path": "PATH2",
        "age": 22,
        "major": "생명과학부"
    }
]
```

###### Response: Failed (Invalid ID Parameter)

- status: `404`

```json
[]
```

##### `/pitapat/<from:int>/<to:int>/` [POST]

###### Request

```json
{}
```

###### Response: Success

- status: `201`

```json
{}
```

###### Response: Failed (Duplicated Pitapat Response)

- status: `409`

```json
{}
```

###### Response: Failed (Invalid From or To Parameter)

- status: `404`

```json
{}
```

##### `/pitapat/<from:int>/<to:int>/` [DELETE]

###### Request

```json
{}
```

###### Response: Success

- status: `204`

```json
{}
```

###### Response: Failed (Invalid From or To Parameter)

- status: `404`

```json
{}
```

## Implementation Plan

Features will be implemented based on the user story written in Requirements and Specification documentation. Works will be divided so that members can take charge of each page and perform the features required for that page. The division is based on difficulties and time taken for the feature to be implemented. We aim to implement the task until the corresponding sprint session.

Key features are prioritized before the mid-presentation so that they can be completed faster than others. User List, User Detail, and Pitapat List pages, the essential elements of the service, should be completed up to Sprint 3. Login and Sign Up pages have the next priority, which contain the main differenciation of our service: university email authentication. Chatting is one of the most important features, but its priority is set relatively low due to its implementation difficulties. Setting pages, which are necessary but are less important than the other features mentioned above, will be developed gradually after the implementation of core features.

|      | Page         | Feature                                        | Dependency | Difficulties | Time | Sprints | Manager | Challenges                                                   |
| ---- | ------------ | ---------------------------------------------- | ---------- | ------------ | ---- | ------- | ------- | ------------------------------------------------------------ |
| 1    | Login        | Sign in                                        |            | 1            | 2    | 3       |         |                                                              |
| 2    | Sign Up      | Authenticate register by university email      |            | 2            | 3    | 3       |         |                                                              |
| 3    | Sign Up      | Create a profile                               |            | 4            | 4    | 4       |         | Upload photo and make user-tag relationship                  |
| 4    | User List    | Show the list of users' profiles               |            | 3            | 4    | 2,3     |         | Filter profiles by tags                                      |
| 5    | User Detail  | Show user's profile in detail                  |            | 2            | 3    | 2,3     |         |                                                              |
| 6    | Pitapat List | Show the list of pitapats from others          |            | 2            | 3    | 2,3     |         |                                                              |
| 7    | Pitapat List | Accept or reject received pitapat request      | 6          | 3            | 4    | 2,3     |         | Delete processed users from pitapat list<br />Activate accepted users in Chat List page |
| 8    | Chat List    | Show the list of chat rooms with matched users |            | 3            | 3    | 4       |         |                                                              |
| 9    | Chat         | 1:1 chat with matched user                     |            | 5            | 5    | 4       |         |                                                              |
| 10   | Profile Edit | Edit own profile                               |            | 3            | 4    | 5       |         | Upload or delete photo                                       |
| 11   | Setting      | Sign out                                       | 1          | 2            | 3    | 5       |         |                                                              |
| 12   | Setting      | Withdraw                                       |            | 1            | 2    | 5       |         |                                                              |

## Testing Plan

### Unit Testing

In order to test React and Redux code for the frontend, Jest framework will be used. In a testing unit such as a component or a function, external dependencies will be replaced by mocking. For the backend, test coverage will be checked by TestCase class provided in Django unittest. In both cases, we aim to achieve more than 90% coverage.

### Funtional Testing

Frontend would be tested by mocking database and server using Jest framework. Backend would be tested with Python unittest whether desired HTTP responses are created when HTTP requests are issued.

### Acceptance & Integration Testing

For the acceptance test, cucumber will be used to automatically map user stories into tests. The user story is already been completed in Sprint 1, so we can proceed with the acceptance test as soon as our service is completed. For the integration test, we would use the tool Travis CI.

## Document Revision History

- Rev. 1.0, 10/28/2022 - initial version
