FROM node:18.12-alpine

WORKDIR /usr/src/app
COPY . .

RUN npm install && \
    adduser --system --no-create-home appuser

RUN mkdir /home/appuser && chown appuser /home/appuser
USER appuser

EXPOSE 3001

CMD ["npm", "run", "dev"]