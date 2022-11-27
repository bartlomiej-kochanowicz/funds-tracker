FROM node:18-slim as development

WORKDIR /webserver

COPY package.json pnpm-lock.yaml ./

RUN apt-get update && apt-get install -y vim && apt-get install -y procps && apt-get install -y build-essential && apt-get install -y python3

RUN npm i -g npm && npm i -g pnpm

RUN pnpm install glob rimraf node-gyp

RUN pnpm install

RUN pnpm rebuild bcrypt

COPY . .

RUN npx prisma generate

CMD [ "pnpm", "start:dev" ]
