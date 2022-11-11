# Pitapat Campus: Sprint #3 Backlog

## Revised Documentations

### Requirements and Specification



### Design and Planning



## Implementations

### Frontend

Pages, components, and redux stores below are implemented:

#### Pages / Components

- `AppBar`
- `NavigationBar`
- `SignIn`
- `SignUp`
  - `UniversityCheck`
  - `EmailVerification`
  - `PersonalInformation`
    - `InformationInput`
  - `CreateTag`
  - `Introduction`
  - `ImageUpload`
    - `ImageUploadIcon`
- `Search`
  - `Profile`
    - `PitapatButton`
- `ProfileDetail`
  - `PhotoSlider`
- `PitapatList`
  - `PitapatReceived`
  - `PitapatSent`
- `ChatList`
  - `ChatListElement`
- `ChatDetail`
  - `ChatBox`
- `Setting`

#### Stores

- `user`
- `university`
- `college`
- `major`
- `photo`
- `tag`
- `pitapat`
- `chat`

## Test Coverage

### Frontend

[screenshot]

There are several files with low coverages:

- 

## Current Progress

| Todos                             | Sub-items                                                    |        Status         |
| :-------------------------------- | :----------------------------------------------------------- | :-------------------: |
| **Requirement and Specification** | Market Analysis, User Stories, User Interface                |         DONE          |
| **MVC Design**                    | Model-View-Controller Design                                 |         DONE          |
| **Frontend Design**               | Pages Diagram, Components Diagram                            |         DONE          |
| **Backend Design**                | API Table, HTTP Data Format                                  |         DONE          |
| **Frontend Development**          | Sign In, Sign Up, Search, Profile Detail, Pitapat List, Chat List, Chat Detail, Setting |         DONE          |
| **Frontend Development**          | Tag/Major/Gender Filtering, Profile Edit                     |        ONGOING        |
| **Frontend Testing**              | Component/Page Unit Tests                                    |        ONGOING        |
| **Backend Development**           | Model/View Implementation, Image Storing via AWS S3          |  PLANNED (Sprint 4)   |
| **Backend Testing**               | View Unit Tests                                              | PLANNED (Sprint 4, 5) |
| **Additional Features**           | Blocking Unwanted Users, Payment System                      |  PLANNED (Sprint 5)   |
| **Deployment**                    | Deployment via AWS EC2                                       |  PLANNED (Sprint 5)   |