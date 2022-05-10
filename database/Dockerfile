FROM node:lts-alpine
WORKDIR /src/chat/database

COPY . ./
RUN yarn install

CMD [ "yarn", "start" ]