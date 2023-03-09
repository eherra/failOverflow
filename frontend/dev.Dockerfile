FROM node:18.12-alpine

WORKDIR /usr/src/app
COPY . .

RUN npm install && \
    adduser --system --no-create-home appuser

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache
RUN mkdir /home/appuser && chown appuser /home/appuser

USER appuser

EXPOSE 3000

CMD ["npm", "start"]