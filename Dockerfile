FROM node:16.13.1
WORKDIR /chat
COPY ./ ./
RUN npm install
CMD npm start
EXPOSE 3000
