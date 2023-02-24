FROM --platform=linux/amd64 node:18.12-alpine

WORKDIR /usr/src/app
COPY ./frontend ./frontend
RUN cd frontend && npm install

COPY ./backend ./backend
RUN cd backend && npm install && npm run build:ui && npm run build:backend

WORKDIR /usr/src/app/backend
EXPOSE 3001
CMD ["npm", "run", "start"]