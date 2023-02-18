FROM node:lts-alpine3.17

MAINTAINER Andrey Streltsov <streltsov.34rus@yandex.ru>

ENV TZ=Europe/Moscow

WORKDIR /var/www/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD node server.js
