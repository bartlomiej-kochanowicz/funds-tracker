FROM node:18-slim as development

WORKDIR /api

COPY package.json pnpm-lock.yaml ./

RUN apt-get update && apt-get install -y vim && apt-get install -y procps

RUN corepack enable && corepack prepare pnpm@7.8.0 --activate

RUN npm install -g npm

RUN pnpm install glob rimraf

RUN pnpm install

COPY . .

RUN pnpm build