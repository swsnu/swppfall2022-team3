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

## User Stories

### Signing Up

- actor: a university student who wants to use Pitapat Campus
- precondition: The user is on the login page.
- trigger: The user clicks the sign-up button.
- scenarios
  - The user selects their own university.
  - The mail domain is fixed, and the user enters the email, authentication mail is sent to the corresponding email.
  - Authentication is completed when the user checks the authentication mail and enters the verification code.
  - The user sets the password, and an account is created.
- postcondition: The corresponding account is created.
- exceptions
  - The email already exists in user database.
  - The authentication mail is sent, but the user doesn’t check it in time.
  - The password is not strong.
- acceptance tests
  - (1)
    - given: a valid email
    - when: pushes confirm button
    - then: authentication mail is sent to the corresponding email
  - (2)
    - given: already-existing email
    - when: pushes confirm button
    - then: alert that the email already exists, and stay on that page
  - (3)
    - given: authentication mail is sent
    - when: user enters the verification code
    - then: proceed to the password setting step
  - (4)
    - given: authentication mail is sent
    - when: it is incorrect verification code or the time is over
    - then: alert that verification code is wrong or the available time has passed, and re-send authentication mail to guide the user sign up

### Creating a Profile

- actor: a user who finished sign-up
- precondition: The user only finished email authorization.
- trigger: User's email is authorized but the user does not have profiles.
- scenarios
  - A user finishes email auth at the email-auth page.
- postcondition: The user will have a profile.
- exception: There are some required fields not filled.
- acceptance tests:
  - (1)
    - given: valid inputs
    - when: pushes submit button
    - then: a user profile is made.
  - (2)
    - given: some necessary fields are not filled
    - when: pushes submit button
    - then: alert the user that necessary fields are not filled

### Updating a Profile

- actor: a user who finished sign-up
- precondition: User should have their profiles.
- trigger: The user pushes “change profile” button.
- scenarios
  - The profile-update page looks like the user-info page, but the user can update each profile element.
  - Every profile element could be updated, but required fields should not be empty.
  - After the user finishes update and click the “confirm” button, the user profile is updated.
- postcondition: User will have an updated profile.
- exceptions
  - Tries to make required field empty.
- acceptance tests:
  - (1)
    - given: valid inputs
    - when: pushes submit button
    - then: the user profile is updated
  - (2)
    - given: some necessary fields are updated as empty value
    - when: pushes submit button
    - then: alert the user that necessary fields are not filled

### Sending Pitapat to Others

- actor: a user who find out other impressive users
- precondition: Pitapat sender and receiver are not yet matched.
- trigger: The user presses “pitapat” button on the profile page.
- scenarios
  - The user search page contains other users’ basic information such as a nickname, main profile image, and age.
  - The user can see the profile detail of the others by clicking the others’ main profile image.
  - The user sends a request by pressing the pitapat button.
- postconditions
  - The receiver can check the pitapat on the list of Pitapats page.
  - The sender’s pitapat button became already-sent state.
- acceptance tests:
  - (1)
    - given: a receiver didn’t block a sender
    - when: the sender pushes pitapat button
    - then: pitapat alarm is sent to the receiver

### Seeing the List of Pitapats from Others

- actor: a user who gets a pitapat alarm
- precondition: A sender has sent pitapat to other user.
- trigger: The user presses a pitapat icon on the navigation bar.
- scenarios
  - The list of Pitapats page contains the sender’s basic information such as a nickname, main profile image, and age.
  - The user can see the profile detail of the sender by clicking the sender’s main profile image.
  - The user can press an accept button, which is under the sender’s profile image, or refuse the request by pressing “Refuse” button.
- postconditions
  - After matching up, they both can see others on the chat room list and the pitapat element should be disappeared from the list.
  - After pressing “Refuse”, the pitapat element disappears from the list, and there is no additional chat room
- exception: The user is matched with nobody.
- acceptance tests:
  - (1)
    - given: after receiving Pitapats from others
    - when: when the user check a received Pitapat and press receive button to exchange Pitapats
    - then: both users get matched up successfully and they both can see others on chat room list page
  - (2)
    - given: after receiving Pitapats from others
    - when: when the user check a received Pitapat and press the button to refuse
    - then: there is no matching up

### Seeing the List of Pitapats Sent to Others

- actor: a user who sent pitapats to others.
- precondition: A User has sent pitapats to other users.
- trigger: The user presses a pitapat icon on the navigation bar and clicks  the 'pitapats sent list' tab.
- scenarios
  - The list of Pitapats sent to others contains the receiver’s basic information such as a nickname, main profile image, and age.
  - The user can see the profile detail of the sender by clicking the receiver’s main profile image.
  - The user can cancel a pitapat by clicking the pitapat button which is already toggled on.
- postconditions
  - After canceling a pitapat, the received user's profile is removed from the list.
- acceptance tests:
  - (1)
    - given: after sending Pitapats to others
    - when: when the user checks a sent Pitapat and presses the pitapat button to cancel
    - then: a received user is removed from the list, and the user is removed from the received pitapats list of the other user who just got canceled

### Entering the Chat Room List Page

- actor: a user who has completed profile information
- precondition: The user has signed in.
- trigger: The user presses a “chatting” icon on the navigation bar.
- scenarios
  - The page contains a list of chat rooms with matched users.
  - Each chatting list element shows matched user's name, profile picture, and recent message with him or her.
  - When pressing the element, the user can move into an 1:1 chatting page with that user.
- postconditions
  - Pressing element of some matched user in the list: move into an 1:1 chat room view with him or her.
- exception: The user is matched with nobody.
- acceptance tests:
  - (1)
    - given: the user is in chat room list page
    - when: the user presses a chat room element
    - then: 1:1 chat room with him/her appears
  - (2)
    - given: the user is in the chat room list page
    - when: the user receives a message from some matched user
    - then: the preview message is updated

### 1:1 Chatting with Matched User

- actor: a user who is matched with some other user
- precondition: Two users are matched through exchanging pitapat.
- trigger: The user presses an element in the chat room list.
- scenarios
  - At the upper part of the view, the profile picture of the counterpart is shown. When pressing the name or the profile picture, the user can see the profile or him or her.
  - The user can see sent or received messages with the counterpart at the center of the view. A speech bubble with messages points right if it contains a sent message, and points left with a received message. Message dispatch time is shown by the side of each speech bubble.
- exception: The user tries to send an empty message.
- acceptance tests:
  - (1)
    - given: the message input field contains a non-empty message
    - when: the user presses the send button
    - then: the message is sent and a speech bubble containing the message is added at the bottom of messages
  - (2)
    - given: the user is in the 1:1 chat room
    - when: the message input field is empty
    - then: the button is disabled
  - (3)
    - given: the user is in the 1:1 chat room with a matched user
    - when: the user receives a message from the counterpart
    - then: a speech bubble containing the message is added at the bottom of messages

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
