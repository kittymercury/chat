FROM node:lts-alpine
WORKDIR /src/chat/server

COPY . ./
RUN yarn install

CMD [ "yarn", "start" ]
EXPOSE 8080