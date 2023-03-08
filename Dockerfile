FROM --platform=linux/amd64 node:18.12-alpine

WORKDIR /usr/src/app
COPY ./frontend ./frontend
RUN cd frontend && npm install

ARG REACT_APP_AWS_URL_AS_BUILD_ARG=default
ENV REACT_APP_AWS_URL=$REACT_APP_AWS_URL_AS_BUILD_ARG

COPY ./backend ./backend
RUN cd backend && npm install && npm run build:ui && npm run build:backend

WORKDIR /usr/src/app/backend

EXPOSE 3001
CMD ["npm", "run", "start"]