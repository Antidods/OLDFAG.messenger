FROM node:latest

MAINTAINER Andrey Streltsov <streltsov.34rus@yandex.ru>

ENV TZ=Europe/Moscow

WORKDIR /var/www/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD node server.js
