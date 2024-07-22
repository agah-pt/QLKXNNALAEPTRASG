FROM node:18-alpine3.20

WORKDIR /service

RUN apk update

RUN apk add aws-cli jq haproxy

RUN npm install -g aws-cdk-local aws-cdk ts-node

ADD package*.json .

RUN npm ci

ADD . .

ENTRYPOINT sh