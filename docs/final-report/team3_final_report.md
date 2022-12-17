# Team 3 Final Report

**Woo Seungseok, Kim Hyein, Choi Seongwoo, Choi Moonone**

## Introduction

### Project Abstract

*Pitapat Campus* is a service setting up dates for college students on the same campus. Any college students trying to find a partner on their campus can use this service. Compared with other dating services, *Pitapat Campus* checks users’ registrations through email authentication and allows users to explore candidates only in the same university.
Users should sign up and log in to use the features of the services. Email authentication is required to create an account; a user proves one's registration by providing a college email address (ex. @snu.ac.kr) and checking the verification code. After filling up basic information, including pictures, and adding tags, users can log in and access to main features: exploring profiles, exchanging “pitapat”, and chatting.
Users can look at others' profiles in the search tab and send pitapat as an expression of affection for attractive mates. When receiving pitapat, the user can examine the requestor's profile and accept or reject the call. After granting the request, a private chatting room between matched users is opened and the pair can exchange messages.
Since dating service is more appropriate for mobile, a user interface for mobile devices is designed priorly. There are four main views: search, request list, chatting list, and profile setting. Users can access each main view by pressing the corresponding icon in the navigation bar.

### Target Customers

Due to the COVID-19 pandemic, college students lost the chance to get to know people in real life. Being campus mates (a.k.a CC, Campus Couple) has become much harder, so college students started to find their mates online. As a result, the "dating" board in Everytime, an online university community service, has been vitalized.
*Pitapat Campus* will meet the demand to find boyfriends or girlfriends in the same college online. Students who want to be campus mates will use this software.
The customers will read this document when they want to know the overall features of the service or the purposes of the developers.

### Competitive Landscape

*Pitapat Campus* has two types of competitors. Firstly, dating apps such as Tinder and Amanda are one of the competitor types. These universal dating applications may be attractive to customers who want to get to know people in arbitrary fields. However, they are not good options for users who want to find their partner in a specific group.
Secondly, online university community services like Everytime are often used as dating platforms. Students who want to meet people in the same university can explore self-introduction posts on Everytime's "dating" board. This method hardly allows people to consider others’ appearance, one of the most important factors in choosing a potential sweetheart because most users do not upload their pictures on a public board. Furthermore, there are some irrelevant threads on the board that make the board's reputation bad.
Compared to competitive services, *Pitapat Campus* provides an efficient method to choose one's partner in the same college community based on users' profiles, including pictures, tags, and self-introduction. Matched users can continue communication through one-to-one chatting.

## Implementation

### Frontend

For frontend implementation, *Pitapat Campus* used React.js with Redux. Tailwind CSS framework and Material UI components are adopted to realize UI design with better productivity. For testing, behavior-driven React Testing Library is used based on Jest framework.

#### Page & Component Flow



#### Redux Slices

##### `user` Slice

- states
  - `loginUser`: user who logged in
  - `users`: user list in search page
  - `searchPageIndex`: page number in search page
  - `nextPageUrl`: next page number in search page
  - `filter`: user filter in search page
  - `interestingUser`: other user showed in profile detail page
  - `pitapat`
    - `senders`: pitapat sender list in pitapat list page
    - `receivers`: pitapat receiver list in pitapat list page
  - `blocked`: blocked user list
  - `chat`
    - `participants`: chatting participant user list in chat list page
  - `piatpatListTabIndex`: tab index(received/sent) in pitapat list page
- reducers
  - `fetchSignIn`: sign in at backend server, get sesson token and `sessionid` cookie
  - `fetchSignOut`: sign out at backend server
  - `fetchSignUp`: send new user information to backend server
  - `getUsers`: get user list by filter
  - `getUser`: get a user data
  - `getLoginUser`: get a login user data
  - `getPitapatSenders`: get pitapat sender user list
  - `getPitapatReceivers`: get pitapat receiver user list
  - `getBlockedUsers`: get blocked user list
  - `getChatParticipants`: get chatting participant user list
  - `setFilter`: set user filter
  - `setPitapatListTabIndex`: set tab index(received/sent) in pitapat list page
  - `deleteSender`: delete pitapat sender in user list
  - `deleteReceiver`: delete pitapat receiver in user list
  - `deleteUser`: delete blocked user in user list
  - `addUser`: add a user at first in user list

##### `university` Slice

- states
  - `universities`: university list
- reducers
  - `getUniversities:` get university list

##### `college` Slice

- states
  - `colleges`: college list
- reducers
  - `getColleges`: get college list in a university

##### `major` Slice

- states
  - `majors`: major list
- reducers
  - `getMajorsByCollege`: get major list in a college
  - `getMajorsByUniversity`: get major list in a university

##### `tag` Slice

- states
  - `tags`: tag list
- reducers
  - `getTags`: get tag list

##### `chat` Slice

- states
  - `chatrooms`: chatroom list
  - `chatSockets`: chatroom WebSocket list
- reducers
  - `getChatrooms`: get chatroom list
  - `setChatroomEmpty`: reset chatroom list and sockets
  - `setSocket`: add new WebSocket connection
  - `setChatroomChats`: set chats in chatroom
  - `addChat`: add a chat in chatroom

### Backend

Django is chosen as a backend server framework. For implementational convenience, Django REST Framework is used to construct RESTful APIs. Asynchoronous WebSocket connection for chat service is implemented using Python Channels library. Basic text data is stored in MariaDB, and image sources are saved in Amazon S3. Test codes used Python UnitTest module.

#### API List

| Model            | API                                        | GET                                           | POST                                    | PUT                            | DELETE                                                        |
|------------------|--------------------------------------------|-----------------------------------------------|-----------------------------------------|--------------------------------|---------------------------------------------------------------|
| **University**   | `/university/`                             | get universities                              | X                                       | X                              | X                                                             |
| **College**      | `/college/university/<int:university_key>` | get colleges of a university                  | X                                       | X                              | X                                                             |
| **Major**        | `/major/college/<int:college_key>`         | get majors of a college                       | X                                       | X                              | X                                                             |
|                  | `/major/university/<int:university_key>`   | get majors of a university                    | X                                       | X                              | X                                                             |
| **User**         | `/auth/email/`                             | X                                             | receive email to send verification code | X                              | X                                                             |
|                  | `/auth/verify/`                            | X                                             | check email verification code           | X                              | X                                                             |
|                  | `/auth/login/`                             | X                                             | log in                                  | X                              | X                                                             |
|                  | `/auth/logout/`                            | X                                             | log out                                 | X                              | X                                                             |
|                  | `/user/exist/<str:email>`                  | check email is already exist                  | X                                       | X                              | X                                                             |
|                  | `/user/`                                   | get users                                     | create new user                         | X                              | X                                                             |
|                  | `/user/<int:key>/`                         | get a user and its introduction, photos, tags | X                                       | edit a user                    | delete a user and its introduction, photos, tag relationships |
| **Introduction** | `/user/<int:user_key>/introduction/`       | X                                             | X                                       | edit an introduction of a user | X                                                            |
| **Photo**        | `/photo/user/<int:user_key>/`              | X                                             | create new photo                        | X                              | X                                                            |
|                  | `/photo/<int:key>/`                        | get a photo                                   | X                                       | X                              | delete a photo                           |
|                  | `/user/<int:user_key>/photo/`                          | get photos of a user                                             |   X                            | X                              | X                             |           
| **Tag**          | `/tag/`                                    | get tags                                      |  X                          | X                              | X                                                            |
|                  | `/user/<int:user_key>/tag/`                | X                                             | create user-tag relationships           | X                              | delete user-tag relationships                                |
| **Pitapat**      | `/pitapat/`                                | X                                             | create new pitapat                      | X                              | delete a pitapat                                             |
|                  | `/user/<int:user_key>/pitapat/from/`       | get pitapats from a user                      | X                                       | X                              | X                                                            |
|                  | `/user/<int:user_key>/pitapat/to/`         | get pitapats to a user                        | X                                       | X                              | X                                                            |
| **Chatroom**     | `/chatroom/<int:chatroom_key>/user/`       | get user list in a chatroom                   | X                                       | X                              | X                                                            |
|                  | `/user/<int:user_key>/chatroom/`           | get chatroom list of a user                   | X                                       | X                              | X                                                            |
| **Block**        |  `/block/`                             |                           X                        |   create new block      |                                              X                           |                             delete a block              |
|      |  `/user/<int:user_key>/block/`                             |                           get block list of a user                        |         x       |                                              X                           |                             x              |

#### WebSocket Connection

- `ChatConsumer`
  - `connect`: add an appropriate group in channel layer and send past messages in the group
  - `disconnect`: discard a group in channel layer
  - `receive`: send received message in a group
