# Pitapat Campus: Sprint #5 Backlog

## Implementation

### Frontend

Search filtering user interface corresponding to backend API was implemented in this sprint. Profile edit page is added, so users can modify their personal information, tags, self-introduction, and photos now. In addition, there were lots of feature enhancements: user blocking, infinite scroll in user list page, tag/image delete button, and so on.

### Backend

Block API was added; it represents a relation between two users, so block system works similarly to pitapat system. Email verification code became more complex to prevent malicious prediction.

## Deployment

The website has deployed via AWS EC2. Users can access to the service through Nginx web server. It communicates with uWSGI HTTP API server and ASGI chatting server.

Testing server is running now(https://pitapatcampus-test.com), and we will deploy production server until the poster session.

## Test Coverage

### Frontend

![frontend-coverage](/Users/bong/swpp-project/docs/backlog/sprint5-frontend-coverage.png)

It was hard to write Search page test code. The page includes infinite scroll using `IntersectionObserver`, which is hard to mock.

### Backend

![backend-coverage](/Users/bong/swpp-project/docs/backlog/sprint5-backend-coverage.png)

## Contributions

- 김혜인
  - frontend feature: search filtering, user list infinite scroll, optimization
  - frontend testing: profile, chat detail, appbar, utils, block user list, profile edit(user), user filter
  - deployment: asgi configuration
  - documentation
- 우승석
  - frontend feature: scroll saving, profile edit(photo), optimization
  - frontend testing: image upload, redux reducers(user, chat), profile edit(user, photo), user filter
  - deployment: nginx configuration, uwsgi configuration
- 최문원
  - frontend feature: tab saving, profile detail, profile edit(user, introduction, photo)
  - backend feature: block api
  - final presentation poster
- 최성우
  - frontend feature: block, signup step change
  - backend feature: email verification, user-photo api
  - frontend testing: signin, signup components, block
  - backend testing: block, user-photo, pitapat

## Current Progress

| Todos                             | Sub-items                                                    | Status |
| :-------------------------------- | :----------------------------------------------------------- | :----: |
| **Requirement and Specification** | Market Analysis, User Stories, User Interface                |  DONE  |
| **MVC Design**                    | Model-View-Controller Design                                 |  DONE  |
| **Frontend Design**               | Pages Diagram, Components Diagram                            |  DONE  |
| **Backend Design**                | API Table, HTTP Data Format                                  |  DONE  |
| **Frontend Development**          | Sign In, Sign Up, Search (with filtering), Profile Detail, Pitapat List, Chat List, Chat Detail, Setting, Profile Edit |  DONE  |
| **Frontend Testing**              | Component/Page Unit Tests                                    |  DONE  |
| **Backend Development**           | Database construction, Model/View Implementation, socket communication, Image Storing via AWS S3 |  DONE  |
| **Backend Testing**               | View Unit Tests                                              |  DONE  |
| **Deployment**                    | Deployment via AWS EC2                                       |  DONE  |