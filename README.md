## Fail fast, fail often - and document it

![React](https://img.shields.io/badge/-React-000?&logo=React)
![TypeScript](https://img.shields.io/badge/-TypeScript-000?&logo=TypeScript)
![Node.js](https://img.shields.io/badge/-Node.js-000?&logo=node.js)
![MongoDB](https://img.shields.io/badge/-MongoDB-000?&logo=MongoDB)
![Docker](https://img.shields.io/badge/-Docker-000?&logo=Docker)
![AWS](https://img.shields.io/badge/-AWS-000?&logo=Amazon-AWS&logoColor=F90)
![Heroku](https://img.shields.io/badge/-Heroku-000?&logo=Heroku)

> Full Stack Project 2023, course details [here.](https://github.com/fullstack-hy2020/misc/blob/master/harjoitustyo.md)

### What

Like Stack Overflow, but for failures.

App's users can create an account and publish failures which they faced while progamming. A failure contains information, such as `title`, `description`, `solution` and the `technologies` which were used. When creating a failure, user can set if they want commenting to be allowed or not.

Users can later manage their profile details e.g. change password and add/change/remove avatar photo. Created failures can be deleted later and commenting allowance changed.

Profile overview page contains three different data charts of distributions of users information. 

Data charts distributions:
- technologies usage
- failure creations
- votes acquired

### Overview of the app (1min)

<img src="https://github.com/eherra/failoverflow/blob/main/docs/images/demo.gif" width="80%" heigth="80%">

### Hosting
App is deployed and running as a docker container at Heroku. 

Access to the app from link: \
https://failoverflow.herokuapp.com/

**Credentials for testing**

username: _userTest_

password: _userTest@_

Or create new user from: \
https://failoverflow.herokuapp.com/register

### Security
For backend (Express.js) security HTTP headers -> [helmet.js](https://helmetjs.github.io/)

Token based authorizations on endpoint calls which requires signed in user  -> [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

### AWS usage <img src="https://github.com/eherra/failoverflow/blob/main/docs/images/awsS3.png" height='5%' width='5%'> 

Users avatar photos will be saved to AWS S3 bucket. 

Library [multer](https://www.npmjs.com/package/multer) is used while working with the image files.

### Design system by <img src="https://github.com/eherra/failoverflow/blob/main/docs/images/grommet.png" height='10%' width='10%'> 

More details: \
https://v2.grommet.io

### Illustrations

https://undraw.co/illustrations

### Local development

Make sure you have both backend and frontend's `.env` files filled with desired values. You can view .env examples from:
- [backend env](https://github.com/eherra/failOverflow/blob/main/backend/.env.example)
- [frontend env](https://github.com/eherra/failOverflow/blob/main/frontend/.env.example)

#### Mongodb

If you prefer MongoDB Atlas, remember to put your atlas url to `DOCKER_URI_ATLAS` variable and make sure you have desired value added [here.](https://github.com/eherra/failOverflow/blob/main/backend/src/index.ts#L12)

#### Starting development mode

Go to project's root folder and run command:

```
docker-compose -f docker-compose.dev.yml up -d
``` 

It will take few moments to start the frontend's development server. After, the app is running at http://localhost:5050 on browser.

If you make any changes to the code locally, they will be immediately updated to the containers and as well be shown on the browser.

> All requests are going through Nginx's reverse proxy on the dev mode. Nginx configurations [here.](https://github.com/eherra/failOverflow/blob/main/nginx.conf)

If you want to close the local development mode, you can shutdown the containers with command:

```
docker-compose -f docker-compose.dev.yml down
```

### Running on Production mode
Go to project's root folder and run command:

```
docker-compose up -d
```  

Application is running at http://localhost:3001 on the browser.

You can shutdown the containers with command:

```
docker-compose down
```  

### Hour report
Can be found [here.](https://github.com/eherra/failOverflow/blob/main/docs/hours.md)

### Project known weaknesses

- Tests missing (:'D)
- There can be some laziness found on TypeScript typing
- MongoDB Aggregations queries could have some refactoring (e.g. more `pipeline` usage on `$lookup` stages) since some of them got quite monsterious
- Input validations, especially on server side could be enhanced
- I didn't put that much effort for mobile UI/UX
