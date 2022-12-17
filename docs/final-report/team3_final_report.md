# <center> Team 3 Final Report </center>

#### <div style="text-align: right"> Woo Seungseok, Kim Hyein, Choi Seongwoo, Choi Moonone </div>

## Project Abstract

*Pitapat Campus* is a service setting up dates for college students on the same campus. Any college students trying to find a partner on their campus can use this service. Compared with other dating services, *Pitapat Campus* checks users’ registrations through email authentication and allows users to explore candidates only in the same university.
Users should sign up and log in to use the features of the services. Email authentication is required to create an account; a user proves one's registration by providing a college email address (ex. @snu.ac.kr) and checking the verification code. After filling up basic information, including pictures, and adding tags, users can log in and access to main features: exploring profiles, exchanging “pitapat”, and chatting.
Users can look at others' profiles in the search tab and send pitapat as an expression of affection for attractive mates. When receiving pitapat, the user can examine the requestor's profile and accept or reject the call. After granting the request, a private chatting room between matched users is opened and the pair can exchange messages.
Since dating service is more appropriate for mobile, a user interface for mobile devices is designed priorly. There are four main views: search, request list, chatting list, and profile setting. Users can access each main view by pressing the corresponding icon in the navigation bar.

## Target Customers

Due to the COVID-19 pandemic, college students lost the chance to get to know people in real life. Being campus mates (a.k.a CC, Campus Couple) has become much harder, so college students started to find their mates online. As a result, the "dating" board in Everytime, an online university community service, has been vitalized.
*Pitapat Campus* will meet the demand to find boyfriends or girlfriends in the same college online. Students who want to be campus mates will use this software.
The customers will read this document when they want to know the overall features of the service or the purposes of the developers.

<img src='../req-spec/everytime.jpeg' width=200 />
<figcaption>- Dating board in Everytime</figcaption>

## Competitive Landscape

*Pitapat Campus* has two types of competitors. Firstly, dating apps such as Tinder and Amanda are one of the competitor types. These universal dating applications may be attractive to customers who want to get to know people in arbitrary fields. However, they are not good options for users who want to find their partner in a specific group.
Secondly, online university community services like Everytime are often used as dating platforms. Students who want to meet people in the same university can explore self-introduction posts on Everytime's "dating" board. This method hardly allows people to consider others’ appearance, one of the most important factors in choosing a potential sweetheart because most users do not upload their pictures on a public board. Furthermore, there are some irrelevant threads on the board that make the board's reputation bad.
Compared to competitive services, *Pitapat Campus* provides an efficient method to choose one's partner in the same college community based on users' profiles, including pictures, tags, and self-introduction. Matched users can continue communication through one-to-one chatting.

## Backend

#### Api Design

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
| **Introduction** | `/user/<int:user_key>/introduction/`       | X                                             | X                                       | edit an introduction of a user | X                                                             |
| **Photo**        | `/photo/user/<int:user_key>/`              | X                                             | create new photo                        | X                              | X                                                             |
|                  | `/photo/<int:key>/`                        | get a photo                                   | X                                       | X                              | delete a photo                                                |
|                  | `/user/<int:user_key>/photo/`              | get photos of a user                          | X                                       | X                              | X                                                             |           
| **Tag**          | `/tag/`                                    | get tags                                      | X                                       | X                              | X                                                             |
|                  | `/user/<int:user_key>/tag/`                | X                                             | create user-tag relationships           | X                              | delete user-tag relationships                                 |
| **Pitapat**      | `/pitapat/`                                | X                                             | create new pitapat                      | X                              | delete a pitapat                                              |
|                  | `/user/<int:user_key>/pitapat/from/`       | get pitapats from a user                      | X                                       | X                              | X                                                             |
|                  | `/user/<int:user_key>/pitapat/to/`         | get pitapats to a user                        | X                                       | X                              | X                                                             |
| **Chatroom**     | `/chatroom/<int:chatroom_key>/user/`       | get user list in a chatroom                   | X                                       | X                              | X                                                             |
|                  | `/user/<int:user_key>/chatroom/`           | get chatroom list of a user                   | X                                       | X                              | X                                                             |
| **Block**        | `/block/`                                  | X                                             | create new block                        | X                              | delete a block                                                |
|                  | `/user/<int:user_key>/block/`              | get block list of a user                      | x                                       | X                              | x                                                             |
