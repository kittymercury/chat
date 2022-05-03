FROM node:lts-alpine
WORKDIR /src/tis/database

COPY . ./
RUN yarn install

CMD [ "yarn", "start" ]