## Project Requirements

### Technologies

Frontend
- React + TypeScript

Backend 
- Node.js (Express) + TypeScript

### UI Design

Grommet \
https://v2.grommet.io/starter

### Color palette
2 main colors
- #A7BEAE
- #EFEFEF

### Functionalities

#### User / Login
- register user
- login
    - jwt
- logout
- sessions

#### Settings
- settings page
    - modify own info
    - Manage failures
        - delete failures

#### Failure list
- list of fails (create design)
    - fail basic info
        - more details when pressed
- voting button
- giving stars button
- design of the failpost card
    - expander
        - tabs
            - overview
            - reviews
            - comments

### API calls

#### POST
- creating user
    - login
    - logout
- creating post
- adding comment
- liking/voting post

#### PUT
- updating post
- updating user settings

#### GET
- get failures
- get user failures
- get fail of the week
- get fail of the month

#### DELETE
- delete failure
- delete avatar

### Database

MongoDB V5.0.14 (Atlas Free tier has this version)
