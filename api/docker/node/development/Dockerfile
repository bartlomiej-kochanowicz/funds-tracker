FROM node:18-slim

WORKDIR /api

RUN apt-get update && apt-get install -y vim
RUN corepack enable && corepack prepare pnpm@7.8.0 --activate

COPY package.json ./

RUN pnpm install

COPY . .

CMD [ "pnpm", "start:dev" ]